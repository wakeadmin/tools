/* eslint-disable import/no-commonjs */
const { defineConfig } = require('@vue/cli-service');
const { defineCE } = require('@wakeadmin/vue-cli-plugin-ce');
const { defineVendors } = require('@wakeadmin/vue-cli-plugin-vendor');

/**
 * 接口服务器
 */
const SERVER = process.env.SERVER || 'https://www.wakedt.cn/';

module.exports = defineConfig({
  parallel: false,
  transpileDependencies: [/(wakeapp|wakeadmin)/],
  pluginOptions: {
    ...defineCE({ customElement: /wkc-/ }),
    ...defineVendors({
      modules: {
        // FIXME: 这可能会导致子应用无法正常运行，基座暂时不使用 vendor
        // vue: ['Vue', 'vue@3.2/dist/vue.runtime.global.prod.js'],
        // 'vue-router': ['VueRouter', 'vue-router@4.1/dist/vue-router.global.prod.js'],
      },
    }),
  },
  chainWebpack(chain) {
    // 支持内联 style
    const config = chain.module.rule('scss').oneOf('normal').toConfig().use;
    const cssLoaderIndex = config.findIndex(i => i.loader.includes('css-loader'));
    const rule = chain.module
      .rule('scss')
      .oneOf('inline')
      .before('normal')
      .resourceQuery(/\\?inline/);

    const cssLoader = config[cssLoaderIndex];
    cssLoader.options = { ...cssLoader.options, exportType: 'string' };

    const loadersBeforeCSS = config.slice(cssLoaderIndex);

    loadersBeforeCSS.forEach(l => {
      rule.use(l.__useName).loader(l.loader).options(l.options);
    });
  },
  configureWebpack() {
    return {
      cache: {
        type: 'filesystem',
        buildDependencies: {
          // This makes all dependencies of this file - build dependencies
          config: [__filename],
          // By default webpack and loaders are build dependencies
        },
      },
      // 可以获取更好的调试体验
      devtool: 'source-map',
    };
  },
  devServer: {
    port: 80,
    host: '0.0.0.0',
    allowedHosts: 'all',
    proxy: ['/permission', '/wd', '/dw', '/login.html', '/app.html'].reduce((prev, cur) => {
      prev[cur] = {
        target: SERVER,
        changeOrigin: true,
        secure: false,
        // 修改 cookie
        onProxyRes(proxyRes) {
          const cookies = proxyRes.headers['set-cookie'];
          if (cookies) {
            const newCookie = cookies.map(function (cookie) {
              return cookie.replace(/Domain=.*?(\.\w+\.\w+);/i, 'Domain=$1;');
            });
            // 修改cookie path
            delete proxyRes.headers['set-cookie'];
            proxyRes.headers['set-cookie'] = newCookie;
          }

          // 绕过安全认证
          proxyRes.headers['access-control-allow-origin'] = '*';

          delete proxyRes.headers['content-security-policy'];
          delete proxyRes.headers['content-security-policy-report-only'];
        },
      };

      return prev;
    }, {}),
  },
});
