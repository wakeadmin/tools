import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';

import 'normalize.css';
// 主题包，生产环境由运行容器注入
import '@wakeadmin/theme';
import './App.scss';

export default () => (
  <ElConfigProvider namespace="ep">
    <RouterView />
  </ElConfigProvider>
);
