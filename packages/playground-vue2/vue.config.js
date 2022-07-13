const { defineConfig } = require('@vue/cli-service');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

module.exports = defineConfig({
  transpileDependencies: false,
  pluginOptions: {
    ...defineMappChild({
      activeRule: '/dsp.html',
    }),
  },
  lintOnSave: false,
});
