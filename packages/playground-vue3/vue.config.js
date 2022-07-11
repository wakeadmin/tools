/* eslint-disable no-template-curly-in-string */
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
const { defineMappChild } = require('@wakeadmin/vue-cli-plugin-mapp-child');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/ }),
    // 微前端集成配置
    ...defineMappChild(
      process.env.NODE_ENV === 'production'
        ? {
            CDNDomain: "<?= cdnDomain ? `//${cdnDomain}` : '' ?>",
            baseUrl: '<?= removeTrailingSlash(base) ?>',
            activeRule: '/wkb.html',
          }
        : {}
    ),
  },
});
