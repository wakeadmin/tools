import { h } from 'vue';
import { RouterView } from 'vue-router';

import 'normalize.css';

// 先导入 element-ui 样式, 后覆盖配置
import 'element-plus/dist/index.css';
import '@wakeadmin/theme';
import '@wakeadmin/theme/adapter/element-plus.css';

import './App.scss';

export default () => h(RouterView);
