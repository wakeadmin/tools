const path = require('path');
const fs = require('fs');
const json5 = require('json5');

/**
 * @type {import('@vue/cli-service').ServicePlugin}
 * esbuild 不能处理 decoratorMetadata, 需要评估影响。
 *   inversify 对 metadata 的依赖不是特别多，就是无法使用函数参数装饰器，但是本身 babel 也不支持
 */
module.exports = (api, options) => {
  // 检查是否按照了 Typescript 插件
  if (api.hasPlugin('@vue/cli-plugin-typescript')) {
    throw new Error('请移除 @vue/cli-plugin-typescript 插件');
  }

  api.chainWebpack(config => {
    config.resolveLoader.modules.prepend(path.join(__dirname, 'node_modules'));

    const mainPath = api.resolve('src/main.ts');
    const tsconfigPath = api.resolve('tsconfig.json');
    const tsconfigContent = json5.parse(fs.readFileSync(tsconfigPath, 'utf8'));

    // 跳转为 main.ts 作为入口
    if (fs.existsSync(mainPath) && !options.pages) {
      config.entry('app').clear().add('./src/main.ts');
    }

    // 扩展名推断
    config.resolve.extensions.prepend('.ts').prepend('.tsx');

    const tsRule = config.module.rule('ts').test(/\.ts$/);
    const tsxRule = config.module.rule('tsx').test(/\.tsx$/);

    // add a loader to both *.ts & vue<lang="ts">
    const addLoader = ({ name, loader, options: loaderOptions }) => {
      tsRule.use(name).loader(loader).options(loaderOptions);
      tsxRule.use(name).loader(loader).options(loaderOptions);
    };

    // cache 缓存
    try {
      const cacheLoaderPath = require.resolve('cache-loader');

      addLoader({
        name: 'cache-loader',
        loader: cacheLoaderPath,
        options: api.genCacheConfig(
          'typescript-loader',
          {
            'esbuild-loader': require('esbuild-loader/package.json').version,
            typescript: require('typescript/package.json').version,
            modern: !!process.env.VUE_CLI_MODERN_BUILD,
          },
          'tsconfig.json'
        ),
      });
    } catch (e) {}

    // 这里还是需要 babel，比如添加一些兼容性 polyfill 之类的工作
    if (api.hasPlugin('babel')) {
      addLoader({
        name: 'babel-loader',
        loader: require.resolve('babel-loader'),
      });
    }

    // jsx 等配置会在 tsconfig 中自动获取，这里不需要配置
    const commonOptions = {
      target:
        (tsconfigContent && tsconfigContent.compilerOptions && tsconfigContent.compilerOptions.target) || 'es2015',
    };

    tsRule
      .use('esbuild-loader')
      .loader(require.resolve('esbuild-loader'))
      .options({
        ...commonOptions,
        loader: 'ts',
      });

    tsxRule
      .use('esbuild-loader')
      .loader(require.resolve('esbuild-loader'))
      .options({
        ...commonOptions,
        loader: 'tsx',
      });
  });
};
