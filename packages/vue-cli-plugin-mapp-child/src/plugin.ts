import fs from 'fs';
import path from 'path';
import { camelCase, removeTrailingSlash, addTrailingSlash, addHeadingSlash } from '@wakeadmin/utils';
import type { ServicePlugin } from '@vue/cli-service';
import Table from 'cli-table';
import type { MicroApp } from '@wakeadmin/mapp/main';

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
import { WebpackMAPPJsonPlugin } from './WebpackMAPPJsonPlugin';

export interface PluginOptions {
  /**
   * 是否在微前端运行容器下运行。微前端运行容器支持模板
   * 默认为 true
   */
  terminalMode?: boolean;

  /**
   * CDN 域名，如果静态资源需要由 CDN 分发，则需要配置此项
   * 如果开启了 terminalMode, CDNDomain 默认为 "<?= cdnDomain ? '//' + cdnDomain : '' ?>"
   */
  CDNDomain?: string;

  /**
   * 微应用名称，默认从 package.json name 读取，并转换为驼峰形式
   */
  name?: string;

  /**
   * 主应用基础路径，默认为 '/' , 建议和主应用配置一致
   *
   * 如果开启了 terminalMode, baseUrl 默认为 "<?= removeTrailingSlash(base) ?>"
   */
  baseUrl?: string;

  /**
   * 微应用 publicPath，默认为 auto, 即 '<CDNDomain><base>/__apps__/<name>/',
   */
  publicPath?: string;

  /**
   * 从基座中共享的依赖，必须精确匹配
   */
  shared?: SharedDeclaration[];

  // 以下是 MAPP 的一些配置项

  /**
   * 子应用的激活路由，默认为 /<name>
   */
  activeRule?: string;

  /**
   * 独立模式，默认为 false
   */
  independent?: boolean;

  /**
   * 用于多业态应用，绑定到同一个身份上
   */
  alias?: string;
}

const PLUGIN_NAME = pluginPkg.name;

/**
 * 惟客云微应用接入插件
 */
export const plugin: ServicePlugin = (api, options) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const pluginOptions = ((options.pluginOptions as any)?.[PLUGIN_NAME] || {}) as PluginOptions;

  const pkgPath = api.resolve('package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath).toString()) as PackageJSONLike;

  const terminalMode = (pluginOptions.terminalMode ?? true) && isProduction; // 生产环境才起作用
  const _name = camelCase(pluginOptions.name || getNameFromPackageJson(pkg));
  const _CDNDomain = pluginOptions.CDNDomain ?? (terminalMode ? "<?= cdnDomain ? '//' + cdnDomain : '' ?>" : undefined);
  const _baseUrl = pluginOptions.baseUrl ?? (terminalMode ? '<?= removeTrailingSlash(base) ?>' : undefined) ?? '/';
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

  // publicPath 最好以 / 结束
  const publicPath = addTrailingSlash(
    _publicPath === 'auto'
      ? isProduction
        ? joinCDNDomain(defaultPublicPath) // 按照 wakedata 微前端部署路径
        : `//localhost:${port}/` // 本地开发，硬编码 port, 这样不需要在代码中引入  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
      : _publicPath
  );

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

  const mapp: MicroApp = {
    name: _name,
    alias: pluginOptions.alias,
    activeRule: pluginOptions.activeRule ?? addHeadingSlash(_name),
    entry: isProduction ? `__apps__/${_name}` : publicPath,
    version: pkg.version,
    description: pkg.description,
    independent: pluginOptions.independent,
  };

  const table = new Table({ colWidths: [15, 100] });

  table.push(
    ['mode', '子应用'],
    ['terminalMode', terminalMode],
    ['name', _name],
    ['publicPath', publicPath],
    ['port', port],
    ['assetsDir', assetsDir],
    ['outputDir', outputDir],
    ['shared', JSON.stringify(_shared, null, 2)],
    ['mapp', JSON.stringify(mapp, null, 2)]
  );

  console.log(table.toString());
  console.log('\n\n');

  options.publicPath = publicPath;
  options.assetsDir = assetsDir;
  options.outputDir = outputDir;

  // 合并 webpack 配置，如果用户在 vue.config.js 定义了，会以用户的为准
  api.configureWebpack(() => {
    return {
      externals,
      plugins: [new WebpackMAPPJsonPlugin(mapp)],
    };
  });

  api.chainWebpack(chain => {
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
