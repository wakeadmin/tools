// @ts-check
/* eslint-disable no-template-curly-in-string */
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');
const { defineVendors } = require('@wakeadmin/vue-cli-plugin-vendor');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  pages: {
    index: 'src/main.ts',
    another: 'src/another.ts',
  },
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/ }),
    // 微前端集成配置
    ...defineMappChild({
      mapp: [
        {
          entry: 'index',
          activeRule: '/playgroundVue3',
        },
        {
          entry: 'another',
          activeRule: '/playgroundVue3Another',
          independent: true,
        },
      ],
    }),
    ...defineVendors({
      modules: {
        vue: ['Vue', 'vue@3.2/dist/vue.runtime.global.prod.js?patchGlobal=Vue'],
        'vue-router': ['VueRouter', 'vue-router@4.1/dist/vue-router.global.prod.js?patchGlobal=VueRouter'],
      },
    }),
  },
});
