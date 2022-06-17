import fs from 'fs';
import path from 'path';
import { camelCase, removeTrailingSlash } from '@wakeadmin/utils';
import type { ServicePlugin } from '@vue/cli-service';
import Table from 'cli-table';

import {
  SharedDeclaration,
  PackageJSONLike,
  getNameFromPackageJson,
  getHashedPort,
  transformSharedToExternal,
} from './utils';

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import pluginPkg from '../package.json';

export interface PluginOptions {
  /**
   * CDN 域名，如果静态资源需要由 CDN 分发，则需要配置此项
   */
  CDNDomain?: string;
  /**
   * 微应用名称，默认从 package.json name 读取，并转换为驼峰形式
   */
  name?: string;

  /**
   * 主应用基础路径，默认为 '/' , 建议和主应用配置一致
   */
  baseUrl?: string;

  /**
   * 微应用 publicPath，默认为 auto, 即 '<base>/__apps__/NAME/'
   */
  publicPath?: string;

  /**
   * 微应用导出的 library 类型， 默认为 umd
   */
  libraryType?: string;

  /**
   * 从基座中共享的依赖，必须精确匹配
   */
  shared?: SharedDeclaration[];
}

const PLUGIN_NAME = pluginPkg.name;
const isProduction = process.env.NODE_ENV === 'production';

/**
 * 惟客云微应用接入插件
 */
export const plugin: ServicePlugin = (api, options) => {
  const pluginOptions = (options.pluginOptions as any)?.[PLUGIN_NAME] || {};

  const pkgPath = api.resolve('package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString()) as PackageJSONLike;

  const _name = camelCase(pluginOptions.name || getNameFromPackageJson(pkg));
  const _baseUrl = pluginOptions.baseUrl || '/';
  const _CDNDomain = pluginOptions.CDNDomain;
  const _libraryType = pluginOptions.libraryType || 'umd';
  const _shared = pluginOptions.shared || [];
  const _publicPath = pluginOptions.publicPath || 'auto';

  const port = options.devServer?.port || getHashedPort(_name);
  const externals = transformSharedToExternal(_shared);

  // 开发环境将资源放到 子目录下，集成到基座时方便区分来源于哪个微应用
  const assetsDir = options.assetsDir || isProduction ? '' : _name;

  // 生产环境输出到 dist/NAME/ 目录下, 方便直接拷贝部署
  const outputDir = isProduction
    ? options.outputDir !== 'dist'
      ? options.outputDir
      : `dist/${_name}`
    : options.outputDir;

  const joinCDNDomain = (p: string) => (_CDNDomain ? `${removeTrailingSlash(_CDNDomain)}${p}` : p);

  let defaultPublicPath = path.posix.join(_baseUrl, `__apps__/${_name}/`);

  const publicPath =
    _publicPath === 'auto'
      ? isProduction
        ? joinCDNDomain(defaultPublicPath) // 按照 wakedata 微前端部署路径
        : `//localhost:${port}/` // 本地开发，硬编码 port, 这样不需要在代码中引入  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
      : _publicPath;

  if (options.publicPath !== '/') {
    console.warn(`[${PLUGIN_NAME}] publicPath 将被忽略，请使用下列方式, 定义 publicPath：

// vue.config.js
module.exports = {
  pluginOptions: {
    ...defineMappChild({
      publicPath: 'YOUR_PUBLIC_PATH',
    })
  }
}

 `);
  }

  const table = new Table();

  table.push(
    ['模式', '子应用'],
    ['应用名称', _name],
    ['publicPath', publicPath],
    ['libraryType', _libraryType],
    ['port', port],
    ['assetsDir', assetsDir],
    ['outputDir', outputDir],
    ['shared', JSON.stringify(_shared, null, 2)]
  );

  console.log(table.toString());
  console.log('\n\n');

  options.publicPath = publicPath;
  options.assetsDir = assetsDir;
  options.outputDir = outputDir;

  // 合并 webpack 配置，如果用户在 vue.config.js 定义了，会以用户的为准
  api.configureWebpack(() => {
    return {
      output: {
        library: {
          type: _libraryType,
          name: _name,
        },
      },
      externals,
    };
  });

  // 开发服务器配置
  options.devServer = options.devServer ?? {};
  options.devServer.port = port;

  // 处理跨域问题
  options.devServer.headers = { ...(options.devServer.headers || {}), 'Access-Control-Allow-Origin': '*' };
};

export const defineMappChild = (options: PluginOptions) => {
  return { [PLUGIN_NAME]: options };
};
