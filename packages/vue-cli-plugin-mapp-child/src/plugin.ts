/* eslint-disable no-lone-blocks */
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import {
  camelCase,
  removeTrailingSlash,
  addTrailingSlash,
  addHeadingSlash,
  upperFirst,
  set,
  pick,
} from '@wakeadmin/utils';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { ServicePlugin } from '@vue/cli-service';
import Table from 'cli-table';
import type { MicroApp } from '@wakeadmin/mapp/main';

import {
  SharedDeclaration,
  PackageJSONLike,
  getNameFromPackageJson,
  getHashedPort,
  transformSharedToExternal,
  saveConstantsProviderModule,
} from './utils';

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import pluginPkg from '../package.json';
import { WebpackMAPPJsonPlugin } from './WebpackMAPPJsonPlugin';

export interface MappSingle {
  /**
   * 子应用的激活路由，默认为 /<name>
   */
  activeRule?: string | string[];

  /**
   * 独立模式，默认为 false
   */
  independent?: boolean;

  /**
   * 路由模式，默认为 hash
   */
  routeMode?: 'hash' | 'history';

  /**
   * 用于多业态应用，绑定到同一个身份上
   */
  alias?: string;
}

export interface MappMultiple extends MappSingle {
  /**
   * 应用名称, 默认为 defaultName + upperFirst(entry)
   */
  name?: string;

  /**
   * 入口名称, 即 vue-cli pages 的 key
   */
  entry: string;
}

export interface PluginOptions {
  /**
   * 是否在微前端运行容器下运行。微前端运行容器支持模板
   * 默认为 true
   */
  terminalMode?: boolean;

  /**
   * CDN 域名，如果静态资源需要由 CDN 分发，则需要配置此项
   * 如果开启了 terminalMode, CDNDomain 默认为 "[%= cdnDomain ? '//' + cdnDomain : '' %]"
   */
  CDNDomain?: string;

  /**
   * 微应用名称，默认从 package.json name 读取，并转换为驼峰形式
   */
  name?: string;

  /**
   * 主应用基础路径，默认为 '/' , 建议和主应用配置一致
   *
   * 如果开启了 terminalMode, baseUrl 默认为 "[%= removeTrailingSlash(base) %]"
   */
  baseUrl?: string;

  /**
   * 微应用 publicPath，默认为 auto, 即 '<CDNDomain><base>/__apps__/<name>/',
   */
  publicPath?: string;

  /**
   * 定义变量
   * 这些变量可以在 HTML 模板或者在代码中通过 process.env.* 访问
   */
  constants?: { [key: string]: string | undefined };

  /**
   * 从基座中共享的依赖，必须精确匹配
   */
  shared?: SharedDeclaration[];

  // 以下是 MAPP 的一些配置项
  mapp?: MappSingle | MappMultiple[];
}

const PLUGIN_NAME = pluginPkg.name;

/**
 * 创建 mapp.json 内容
 * @param options
 */
function createMappConfig(options: {
  mapp?: MappSingle | MappMultiple[];
  version?: string;
  description?: string;
  defaultName: string;
  publicPath: string;
  isProduction: boolean;
  checkEntry: (name: string) => void;
}) {
  const { mapp, defaultName, isProduction, version, description, publicPath, checkEntry } = options;

  if (mapp == null || !Array.isArray(mapp) || mapp.length === 0) {
    // 单页应用
    const userDefineConfig = (mapp ?? mapp?.[0] ?? {}) as MappSingle;

    const name = defaultName;
    return {
      name,
      alias: userDefineConfig.alias,
      activeRule: userDefineConfig.activeRule ?? addHeadingSlash(name),
      entry: isProduction ? `__apps__/${name}/` : publicPath,
      independent: userDefineConfig.independent,
      routeMode: userDefineConfig.routeMode,
      version,
      description,
    };
  }

  return mapp.map(i => {
    // 多页应用

    checkEntry(i.entry);

    const name = i.name ?? defaultName + upperFirst(i.entry);

    return {
      name,
      alias: i.alias,
      activeRule: i.activeRule ?? addHeadingSlash(name),
      entry: (isProduction ? `__apps__/${defaultName}/` : publicPath) + i.entry + '.html',
      independent: i.independent,
      routeMode: i.routeMode,
      version,
      description,
    };
  });
}

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
  const _CDNDomain = pluginOptions.CDNDomain ?? (terminalMode ? "[%= cdnDomain ? '//' + cdnDomain : '' %]" : undefined);
  const _baseUrl = pluginOptions.baseUrl ?? (terminalMode ? '[%= removeTrailingSlash(base) %]' : undefined) ?? '/';
  const _shared = pluginOptions.shared || [];
  const _publicPath = pluginOptions.publicPath || 'auto';

  const context = api.service.context;
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
  const isHttps = !!options.devServer?.https;

  let defaultPublicPath = path.posix.join(_baseUrl, `__apps__/${_name}/`);

  // publicPath 最好以 / 结束
  const publicPath = addTrailingSlash(
    _publicPath === 'auto'
      ? isProduction
        ? joinCDNDomain(defaultPublicPath) // 按照 wakedata 微前端部署路径
        : `${isHttps ? 'https' : 'http'}://localhost:${port}/` // 本地开发，硬编码 port, 这样不需要在代码中引入  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
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

  const mapp: MicroApp | MicroApp[] = createMappConfig({
    defaultName: _name,
    version: pkg.version,
    description: pkg.description,
    publicPath,
    isProduction,
    mapp: pluginOptions.mapp,
    checkEntry: name => {
      if (options.pages == null || !Object.prototype.hasOwnProperty.call(options.pages, name)) {
        throw new Error(
          `mapp name 必须在 pages 中定义，现在接收到的是：${name}, 已定义的页面有：${Object.keys(options.pages ?? {})}`
        );
      }
    },
  });

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

  const constants = pluginOptions.constants ?? {};
  const constantKeys = Object.keys(constants);
  // 内置变量
  constants.NODE_ENV = process.env.NODE_ENV;
  constants.BASE_URL = publicPath;

  // 规范化
  for (const constantKey of constantKeys) {
    constants[constantKey] ??= '';
  }

  api.chainWebpack(chain => {
    // 添加导入svg文件原始数据的rule
    chain.module
      .rule('svgRaw')
      .resourceQuery(/raw/)
      // @ts-expect-error
      .type('asset/source')
      .end();

    if (terminalMode) {
      // 添加 hash 查询字符串，方便失效统一缓存失效
      const hashQuery = '?[%= hash %]';

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

    if (constantKeys.length) {
      // vue cli 默认会将 NODE_ENV、BASE_URI 注入到 process.env 和 HTML 模板中，因此这里使用 constantKeys 判断是否需要注入额外的变量
      // 代码注入
      chain.plugin('mapp-constants').use(webpack.DefinePlugin, [
        constantKeys.reduce<Record<string, string>>((prev, cur) => {
          prev[`process.env.${cur}`] = JSON.stringify(constants[cur]);
          return prev;
        }, {}),
      ]);

      // HTML 模板注入
      chain.plugins.values().forEach(plug => {
        // @ts-expect-error
        if (plug.name?.startsWith('html') && plug.get('plugin') === HtmlWebpackPlugin) {
          plug.tap(config => {
            const arg = config[0];

            const templateParameters = arg.templateParameters;

            arg.templateParameters = function () {
              const result = templateParameters.apply(null, arguments);

              Object.assign(result, pick(constants, constantKeys));

              return result;
            };

            return config;
          });
        }
      });
    }

    // provider 注入, 这个主要用于 ejs-loader
    const constantsProviderModulePath = path.join(context, '.temp', 'constants.js');
    saveConstantsProviderModule(constantsProviderModulePath, constants as Record<string, string>);
    chain.plugin('mapp-constants-provider').use(webpack.ProvidePlugin, [
      Object.keys(constants).reduce<Record<string, [string, string]>>((prev, cur) => {
        prev[cur] = [constantsProviderModulePath, cur];
        return prev;
      }, {}),
    ]);
  });

  {
    const extendsKeys = constantKeys.concat(['NODE_ENV', 'BASE_URL']);
    // @ts-expect-error
    const defaultLessData = options.css?.loaderOptions?.less?.additionalData;
    // @ts-expect-error
    const defaultScssData = options.css?.loaderOptions?.scss?.additionalData;

    const addSemiIfNeed = (str?: string) => {
      return (str ? (str.trim().endsWith(';') ? str : str + ';') : '') ?? '';
    };

    // Less 变量注入
    set(
      options,
      'css.loaderOptions.less.additionalData',
      addSemiIfNeed(defaultLessData) + extendsKeys.map(k => `@${k}: "${constants[k]}";`).join('\n')
    );

    // scss 变量注入
    set(
      options,
      'css.loaderOptions.scss.additionalData',
      addSemiIfNeed(defaultScssData) + extendsKeys.map(k => `$${k}: "${constants[k]}";`).join('\n')
    );
  }

  {
    // 避免 CSS loader 处理 url/import 中的模板
    // @ts-expect-error
    const defaultCSSLoaderUrlConfig = options.css?.loaderOptions?.css?.url as
      | boolean
      | ((url: string, resourcePath: string) => boolean)
      | undefined;
    // @ts-expect-error
    const defaultCSSLoaderImportConfig = options.css?.loaderOptions?.css?.import as
      | boolean
      | ((url: string, media: string, resourcePath: string) => boolean)
      | undefined;
    const cssImportUrlFilter = (defaultValue: boolean | Function | undefined) => {
      return {
        filter(url: string) {
          if (defaultValue === false) {
            return false;
          }

          if (typeof defaultValue === 'function') {
            if (!defaultValue.apply(null, arguments)) {
              return false;
            }
          }

          return !url.startsWith('[%');
        },
      };
    };

    set(options, 'css.loaderOptions.css.url', cssImportUrlFilter(defaultCSSLoaderUrlConfig));
    set(options, 'css.loaderOptions.css.import', cssImportUrlFilter(defaultCSSLoaderImportConfig));
  }

  // 开发服务器配置
  options.devServer = options.devServer ?? {};
  options.devServer.port = port;
  options.devServer.allowedHosts = 'all';

  (options.devServer.client ??= {}).webSocketURL = `${isHttps ? 'wss' : 'ws'}://localhost:${port}/ws`;

  // 处理跨域问题
  options.devServer.headers = { ...(options.devServer.headers || {}), 'Access-Control-Allow-Origin': '*' };
};

export const defineMappChild = (options: PluginOptions) => {
  return { [PLUGIN_NAME]: options };
};
