import { ServicePlugin } from '@vue/cli-service';

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import pkg from '../package.json';
import { InjectScriptPlugin } from './InjectScriptPlugin';

export type UMDName = string;

export type ModuleModifier =
  | `${string}@${string}` // 名称 + 版本号形式, 将基于 base 合并
  | `https://${string}`
  | `http://${string}`
  | `//${string}`;

export interface PluginOptions {
  /**
   * 是否在开发环境开启, 默认 false
   */
  enableInDev?: boolean;
  /**
   * 基础路径, base 必须以 / 结束
   */
  base?: `${string}/`;

  /**
   * 模块定义
   */
  modules: {
    [module: string]: [UMDName, ModuleModifier];
  };
}

export const PLUGIN_NAME = pkg.name;

export function defineVendors(options: PluginOptions) {
  return { [PLUGIN_NAME]: options };
}

/**
 * *.tr 翻译文件识别
 */
export const plugin: ServicePlugin = (api, options) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { pluginOptions } = options;
  const ownOptions = ((pluginOptions as any)[PLUGIN_NAME] ?? {}) as PluginOptions;

  if (!isProduction && !ownOptions.enableInDev) {
    return;
  }

  const base = ownOptions.base ?? `<?= publicPath ?>__vendors__/`;

  const modules = Object.keys(ownOptions.modules ?? {}).reduce<{ [module: string]: { name: string; url: string } }>(
    (prev, cur) => {
      const [name, modifier] = ownOptions.modules[cur];
      if (!name || !modifier) {
        throw new Error(`[vue-cli-plugin-vendor] 参数错误， name 或 modifier 为空`);
      }

      const url = modifier.startsWith('http') || modifier.startsWith('//') ? modifier : base + modifier + '.js';

      const desc = {
        name,
        url,
      };

      prev[cur] = desc;

      return prev;
    },
    {}
  );

  const keys = Object.keys(modules);

  if (!keys.length) {
    return;
  }

  api.chainWebpack(chain => {
    const externals = chain.get('externals') ?? {};

    // externals 配置
    chain.externals({
      ...externals,
      ...keys.reduce<{ [key: string]: string }>((prev, cur) => {
        prev[cur] = modules[cur].name;
        return prev;
      }, {}),
    });

    // 注入 script 到 html
    chain
      .plugin('inject-vendor')
      .use(InjectScriptPlugin, [keys.map(i => modules[i].url)])
      .end();
  });
};

export default plugin;
