const { defineConfig } = require('@vue/cli-service');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');
const { defineVendors } = require('@wakeadmin/vue-cli-plugin-vendor');
<% if (type === 'vue3') { %>
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
<% }%>

module.exports = defineConfig({
  parallel: false,
  transpileDependencies: [/(wakeapp|wakeadmin)/],
  pluginOptions: {
    // 详见子应用集成：https://wakeadmin.wakedata.com/mapp/integration.html
    ...defineMappChild({
      mapp: {
        activeRule: '/<%- name %>',
      },
    }),
    // 共享依赖： 详见: https://wakeadmin.wakedata.com/mapp/advanced/vendors.html
    ...defineVendors({
      modules: {},
    }),
    <%- type === 'vue3' ? '...defineCE({ customElement: /wkc-/ }),' : '' %>
  },
  configureWebpack() {
    return {
      // 可以获取更好的调试体验
      devtool: 'source-map',
    };
  },
  devServer: {
    // 配置代理, 通常不需要
    // proxy: ['/api', '/wd'].reduce((prev, cur) => {
    //   prev[cur] = {
    //     target: process.env.SERVER || 'https://www.wakedata.com/',
    //     changeOrigin: true,
    //     secure: false,
    //   };
    //   return prev;
    // }, {}),
  },
  lintOnSave: false,
});
