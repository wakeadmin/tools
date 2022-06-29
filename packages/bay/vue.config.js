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
