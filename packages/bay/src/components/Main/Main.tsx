import { defineComponent, Suspense, watch } from 'vue';
import { DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX } from '@wakeadmin/mapp/main';
import { ElMessageBox } from 'element-plus';

import { useAsset, useBayModel, useBodyClass } from '@/hooks';

import { Header, HeaderFallback } from '../Header';
import { Sidebar, SidebarFallback } from '../Sidebar';

import { AppLoading } from './AppLoading';

import './index.scss';

/**
 * 主页面布局
 * @returns
 */
export const Main = defineComponent({
  name: 'BayMain',
  setup() {
    useBodyClass('bay-ready');
    const FOOTER = useAsset('TXT_BAY_FOOTER', 'WakeData惟客数据，数字经营专家');
    const bay = useBayModel();

    // 初始化基座
    bay.initialize();

    watch(
      () => bay.error,
      err => {
        if (err != null) {
          ElMessageBox.confirm(`应用启动失败: ${err.message}, 请稍后重试`, '抱歉', {
            type: 'error',
            confirmButtonText: '重试',
            cancelButtonText: '返回',
          })
            .then(() => {
              bay.retry();
            })
            .catch(() => {
              window.history.back();
            });
        }
      }
    );

    return () => (
      <main class="bay">
        <Suspense v-slots={{ fallback: () => <HeaderFallback /> }}>
          <Header />
        </Suspense>
        <div class="bay-body">
          <Suspense v-slots={{ fallback: () => <SidebarFallback /> }}>
            <Sidebar />
          </Suspense>
          <div class="bay-content">
            <main class="bay-app-landing" id={DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX}>
              {/* 微应用将挂载到这里 */}
            </main>
            {/* 加载错误 */}
            {bay.bay.isCurrentMicroAppError ? (
              <div class="bay-app-error">
                <wkc-error-page description={`抱歉，应用加载失败`}>
                  {bay.bay.currentMicroAppError?.message}
                </wkc-error-page>
              </div>
            ) : bay.bay.isCurrentMicroAppLoading ? (
              <AppLoading></AppLoading>
            ) : null}
            <footer class="bay-footer">{FOOTER.value}</footer>
          </div>
        </div>
      </main>
    );
  },
});

export default Main;
