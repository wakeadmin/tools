/* eslint-disable no-template-curly-in-string */
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');
const { defineVendors } = require('@wakeadmin/vue-cli-plugin-vendor');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/ }),
    // 微前端集成配置
    ...defineMappChild({
      activeRule: '/wkb.html',
    }),
    ...defineVendors({
      modules: {
        vue: ['Vue', 'vue@3.x'],
        'vue-router': ['VueRouter', 'vue-router@4.x'],
      },
    }),
  },
});
