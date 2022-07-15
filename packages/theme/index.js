// 生产环境由外部注入
if (process.env.NODE_ENV === 'development') {
  require('./dist/share.css');
  require('./dist/element-ui.css');
  require('./dist/element-plus.css');
}
