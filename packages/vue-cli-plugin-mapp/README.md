# wakeadmin 微前端主应用集成

配置

```js
// vue.config.js
const { defineMapp } = require('@wakeadmin/vue-cli-plugin-mapp');

module.exports = defineConfig({
  pluginOptions: {
    ...defineMapp({
      /* 配置参数 */
    }),
  },
});
```
