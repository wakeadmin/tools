const { defineConfig } = require('@vue/cli-service');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  pluginOptions: {
    // 微前端集成配置
    ...defineMappChild({
      shared: [
        { name: 'vue', module: 'vue' },
        { name: 'vue-router', module: 'vue-router' },
      ],
    }),
  },
});
