const { defineConfig } = require('@vue/cli-service');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  pluginOptions: {
    // 微前端集成配置
    ...defineMappChild({
      baseUrl: '/base',
      shared: [
        { name: 'vue3', module: 'vue' },
        { name: 'vue-router3', module: 'vue-router' },
      ],
    }),
  },
});
