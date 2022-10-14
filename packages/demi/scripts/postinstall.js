const { switchVersion, loadModule } = require('./utils');

const Vue = loadModule('vue');

if (!Vue || typeof Vue.version !== 'string') {
  console.warn('[@wakeadmin/demi] Vue is not found. Please run "npm install vue" to install.');
  process.exit(1);
} else if (Vue.version.startsWith('2.7.')) {
  switchVersion(2.7);
} else if (Vue.version.startsWith('2.')) {
  console.warn('[@wakeadmin/demi] Vue 2 不受支持，请升级或安装 2.7+');
  process.exit(1);
} else if (Vue.version.startsWith('3.')) {
  switchVersion(3);
} else {
  console.warn(`[@wakeadmin/demi] Vue version v${Vue.version} is not suppported.`);
}
