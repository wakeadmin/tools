/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
import { ServicePlugin } from '@vue/cli-service';
import { semver, loadModule } from '@vue/cli-shared-utils';
import webpack from 'webpack';

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import pkg from '../package.json';

import { PluginOptions } from './types';
import { createMatcher, stringifyOptions } from './utils';

const PLUGIN_NAME = pkg.name;

/**
 * 配置参数
 * @param options
 * @returns
 */
export const defineCE = (options: PluginOptions) => {
  return { [PLUGIN_NAME]: options };
};

/**
 * vue template 自定义元素编译优化插件
 *
 */
export const plugin: ServicePlugin = (api, options) => {
  const vue = loadModule('vue', api.service.context);
  const isVue3 = vue && semver.major(vue.version) === 3;

  const pluginOptions: PluginOptions = (options.pluginOptions as any)?.[PLUGIN_NAME] || {};

  // thread-loader 不支持传递不可序列化的参数
  if (options.parallel) {
    throw new Error(`[${PLUGIN_NAME}] 开启 parallel 将导致编译失败`);
  }

  if (typeof pluginOptions.customElement === 'undefined') {
    throw new Error(`[${PLUGIN_NAME}] 必须设置 customElement 参数:
\`\`\`
// vue.config.js
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');

module.exports = defineConfig({
  pluginOptions: {
    ...defineCE({customElement: /wkc-/})
  }
})
\`\`\`
    `);
  }

  const matcher = createMatcher(pluginOptions);

  api.chainWebpack(chain => {
    // 注入配置参数
    chain
      .plugin('ceDefine')
      .use(webpack.DefinePlugin, [
        {
          __CE_OPTIONS__: stringifyOptions(pluginOptions),
        },
      ])
      .end();

    if (isVue3) {
      const { nodeTransform } = require('./vue3');
      chain.module
        .rule('vue')
        .use('vue-loader')
        .tap(opts => ({
          ...opts,
          compilerOptions: {
            ...opts.compilerOptions,
            // treat any tag that starts with ion- as custom elements
            isCustomElement: matcher.isCustomElement,
            nodeTransforms: [nodeTransform(pluginOptions)],
          },
        }));
    } else {
      const { TransformModule } = require('./vue2');

      chain.module
        .rule('vue')
        .use('vue-loader')
        .tap(opts => ({
          ...opts,
          compilerOptions: {
            ...opts.compilerOptions,
            modules: [
              // 在 vue 2 下，保持 web component 的使用行为和 vue3 一致
              new TransformModule(pluginOptions),
            ],
          },
        }));
    }
  });
};

export default plugin;
