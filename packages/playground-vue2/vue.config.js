// @ts-check
const { defineConfig } = require('@vue/cli-service');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');
const { defineVendors } = require('@wakeadmin/vue-cli-plugin-vendor');

module.exports = defineConfig({
  transpileDependencies: false,
  pluginOptions: {
    ...defineMappChild({
      mapp: {
        activeRule: '/dsp.html',
      },
    }),
    ...defineVendors({
      enableInDev: true,
      modules: {
        vue: ['Vue', 'https://cdn.jsdelivr.net/npm/vue@2.7.7/dist/vue.runtime.js'],
        'vue-router': ['VueRouter', 'https://cdn.jsdelivr.net/npm/vue-router@3.5.4/dist/vue-router.js'],
      },
    }),
  },
  lintOnSave: false,
});
