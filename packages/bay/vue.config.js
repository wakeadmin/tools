/* eslint-disable import/no-commonjs */
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
const { defineMapp } = require('@wakeadmin/vue-cli-plugin-mapp');

module.exports = defineConfig({
  transpileDependencies: [/(wakeapp|wakeadmin)/],
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/, mustUseProp: /wkc-/ }),
    ...defineMapp({
      // baseUrl: '/base',
      shared: [
        { name: 'vue', module: 'vue' },
        { name: 'vue-router', module: 'vue-router' },
      ],
    }),
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
      resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
    };
  },
  devServer: {
    port: 3000,
    proxy: {
      '/permission': {
        target: 'https://bizpf-test.wakedt.cn/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
