const { switchVersion, loadModule } = require('./utils');
const { gte } = require('semver');

const Vue = loadModule('vue');

if (!Vue || typeof Vue.version !== 'string') {
  console.warn('[@wakeadmin/demi] Vue is not found. Please run "npm install vue" to install.');
  process.exit(1);
}

/**
 * @type {string}
 */
const version = Vue.version;

if (version.startsWith('2.7.')) {
  switchVersion(2.7);
  console.log(`[@wakeadmin/demi] 已切换到 Vue 2.7`);
} else if (version.startsWith('2.')) {
  console.warn('[@wakeadmin/demi] Vue 2 不受支持，请升级或安装 2.7+');
  process.exit(1);
} else if (gte(version, '3.0.0')) {
  if (gte(version, '3.3.0')) {
    // vue 3.3+
    switchVersion(3.3);
  } else {
    switchVersion(3);
  }
  console.log(`[@wakeadmin/demi] 已切换到 Vue 3`);
} else {
  console.warn(`[@wakeadmin/demi] Vue version v${Vue.version} is not suppported.`);
}
