/* eslint-disable import/no-commonjs */
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
const { defineMapp } = require('@wakeadmin/vue-cli-plugin-mapp');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/, mustUseProp: /wkc-/ }),
    ...defineMapp({
      baseUrl: '/base',
    }),
  },
  configureWebpack() {
    return {
      resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
      plugins: [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ],
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
