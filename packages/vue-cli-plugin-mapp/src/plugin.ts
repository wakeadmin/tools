import type { ServicePlugin } from '@vue/cli-service';
import fs from 'fs';
import path from 'path';
import { camelCase, removeTrailingSlash, addTrailingSlash } from '@wakeadmin/utils';
import webpack from 'webpack';
import Table from 'cli-table';

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import pluginPkg from '../package.json';

import { PackageJSONLike, SharedDeclaration, getNameFromPackageJson, generateShareEntry } from './utils';

/**
 * 插件配置
 */
export interface PluginOptions {
  /**
   * 是否在微前端运行容器下运行。微前端运行容器支持模板
   * 默认为 true
   */
  terminalMode?: boolean;

  /**
   * CDN 域名，如果静态资源需要由 CDN 分发，则需要配置此项
   * CDN 域名需要自己加上 https:// 或者 // 前缀，本插件不会处理
   * 如果开启了 terminalMode, CDNDomain 默认为 "<?= cdnDomain ? '//' + cdnDomain : '' ?>"
   */
  CDNDomain?: string;

  /**
   * 主应用基础路径，默认为 '/' ,  你可以在程序中通过 process.env.MAPP_BASE_URL 获取到该路径
   *
   * 如果开启了 terminalMode, baseUrl 默认为 "<?= removeTrailingSlash(base) ?>"
   */
  baseUrl?: string;

  /**
   * 微应用 publicPath，默认为 'CDNDomain/baseUrl/__entry__', 建议配置为 'auto', 默认为 auto
   */
  publicPath?: 'auto' | string;

  /**
   * 共享依赖
   */
  shared?: SharedDeclaration[]; // 共享的依赖
}

const PLUGIN_NAME = pluginPkg.name;

/**
 * 惟客云主应用接入插件
 */
export const plugin: ServicePlugin = (api, options) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const pluginOptions = ((options.pluginOptions as any)?.[PLUGIN_NAME] ?? {}) as PluginOptions;

  const pkgPath = api.resolve('package.json');
  const context = api.service.context;
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString()) as PackageJSONLike;

  const terminalMode = (pluginOptions.terminalMode ?? true) && isProduction; // 生产环境才起作用
  const _CDNDomain = pluginOptions.CDNDomain ?? (terminalMode ? "<?= cdnDomain ? '//' + cdnDomain : '' ?>" : undefined);
  const _baseUrl = pluginOptions.baseUrl ?? (terminalMode ? '<?= removeTrailingSlash(base) ?>' : undefined) ?? '/';
  const _shared = pluginOptions.shared ?? [];
  const _publicPath = pluginOptions.publicPath ?? 'auto';

  // 开发环境将资源放到 子目录下，集成到基座时方便区分来源于主应用
  const assetsDir = options.assetsDir || isProduction ? '' : '__base__';
  const name = camelCase(getNameFromPackageJson(pkg));

  // 放在项目目录下，避免模块查找不一致问题
  const sharedEntryPath = path.join(context, '.temp', `mapp_${name}_shared.js`);

  // 生成分享入口文件
  generateShareEntry(sharedEntryPath, _shared);

  const joinCDNDomain = (p: string) => (_CDNDomain ? `${removeTrailingSlash(_CDNDomain)}${p}` : p);
  const defaultPublicPath = path.posix.join(_baseUrl, '__entry__');

  // publicPath 最好以 / 结束
  const publicPath = addTrailingSlash(
    _publicPath === 'auto'
      ? isProduction
        ? joinCDNDomain(addTrailingSlash(defaultPublicPath))
        : '/' // 本地开发，直接 '/' 即可
      : _publicPath
  );

  if (options.publicPath !== '/') {
    console.warn(`[${PLUGIN_NAME}] publicPath 将被忽略，请使用下列方式, 定义 publicPath, 大部分情况下推荐 auto：

// vue.config.js
module.exports = {
  pluginOptions: {
    ...defineMapp({
      publicPath: 'YOUR_PUBLIC_PATH',
    })
  }
}

 `);
  }

  const table = new Table({ colWidths: [15, 100] });

  table.push(
    ['mode', '主应用'],
    ['terminalMode', terminalMode],
    ['publicPath', publicPath],
    ['baseUrl', `${_baseUrl}, 应用内可以通过 process.env.MAPP_BASE_URL 获取`],
    ['assetsDir', assetsDir],
    ['shared', JSON.stringify(_shared, null, 2)]
  );

  console.log(table.toString());

  console.log('\n\n');

  options.publicPath = publicPath;
  options.assetsDir = assetsDir;

  // 合并 webpack 配置，如果用户在 vue.config.js 定义了，会以用户的为准
  api.chainWebpack(chain => {
    chain
      .plugin('mappDefine')
      // 注入变量
      .use(webpack.DefinePlugin, [
        {
          'process.env.MAPP_BASE_URL': JSON.stringify(_baseUrl),
        },
      ])
      .end();

    if (terminalMode) {
      // 添加 hash 查询字符串，方便失效统一缓存失效
      const hashQuery = '?<?= hash ?>';

      const filename = chain.output.get('filename');
      const chunkFilename = chain.output.get('chunkFilename');

      chain.output.filename(`${filename}${hashQuery}`);
      chain.output.chunkFilename(`${chunkFilename}${hashQuery}`);

      chain.plugin('extract-css').tap(args => {
        const [oldOptions, ...other] = args;
        const newOptions: { filename: string; chunkFilename: string } = { ...oldOptions };

        newOptions.filename = newOptions.filename + hashQuery;
        newOptions.chunkFilename = newOptions.chunkFilename + hashQuery;

        return [newOptions, ...other];
      });
    }

    // 注入共享依赖
    if (_shared.length) {
      const entries = chain.entryPoints.entries();
      Object.keys(entries).forEach(n => {
        chain.entry(n).prepend(sharedEntryPath).end();
      });
    }
  });
};

export function defineMapp(options: PluginOptions) {
  return { [PLUGIN_NAME]: options };
}
