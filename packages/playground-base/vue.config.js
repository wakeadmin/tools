/* eslint-disable import/no-commonjs */
const { defineMapp } = require('@wakeadmin/vue-cli-plugin-mapp');
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');

// const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  pluginOptions: {
    ...defineMapp({
      baseUrl: '/base',
      shared: [
        { name: 'vue3', module: 'vue' },
        { name: 'vue-router3', module: 'vue-router' },
      ],
    }),
    ...defineCE({ customElement: /wkc-/ }),
  },
  configureWebpack() {
    return {
      devtool: 'source-map',
      resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
      plugins: [],
    };
  },
  devServer: {
    port: 3000,
  },
});
