/* eslint-disable import/no-commonjs */
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');

module.exports = defineConfig({
  parallel: false,
  transpileDependencies: [/(wakeapp|wakeadmin)/],
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/ }),
  },
  chainWebpack(chain) {
    // 支持内联 style
    const config = chain.module.rule('scss').oneOf('normal').toConfig().use;
    const cssLoaderIndex = config.findIndex(i => i.loader.includes('css-loader'));
    const rule = chain.module
      .rule('scss')
      .oneOf('inline')
      .before('normal')
      .resourceQuery(/\\?inline/);

    const cssLoader = config[cssLoaderIndex];
    cssLoader.options = { ...cssLoader.options, exportType: 'string' };

    const loadersBeforeCSS = config.slice(cssLoaderIndex);

    loadersBeforeCSS.forEach(l => {
      rule.use(l.__useName).loader(l.loader).options(l.options);
    });
  },
  configureWebpack() {
    return {
      // 可以获取更好的调试体验
      devtool: 'source-map',
      resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
    };
  },
  devServer: {
    port: 3000,
    proxy: ['/permission', '/wd'].reduce((prev, cur) => {
      prev[cur] = {
        target: 'https://bizpf-test.wakedt.cn/',
        changeOrigin: true,
        secure: false,
      };

      return prev;
    }, {}),
  },
});
