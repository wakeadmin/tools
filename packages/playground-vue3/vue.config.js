const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/, mustUseProp: /wkc-/ }),
    // 微前端集成配置
    ...defineMappChild({
      shared: [
        { name: 'vue', module: 'vue' },
        { name: 'vue-router', module: 'vue-router' },
      ],
    }),
  },
});
