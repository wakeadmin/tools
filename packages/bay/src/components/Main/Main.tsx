import { defineComponent, Suspense, watch } from 'vue';
import { DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX } from '@wakeadmin/mapp/main';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';

import { useBayModel, useBodyClass } from '@/hooks';

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
    const bay = useBayModel();
    const { t } = useI18n();

    // 初始化基座
    bay.initialize();

    watch(
      () => bay.error,
      err => {
        if (err != null) {
          ElMessageBox.confirm(t('bay.bootstrapError', { message: err.message }), t('bay.sorry'), {
            type: 'error',
            confirmButtonText: t('bay.retry'),
            cancelButtonText: t('bay.back'),
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
      <main
        class={['bay', { 'bay-menu-hide': !bay.menuVisible, 'bay-menu-with-animate': bay.menuVisibleWithAnimation }]}
      >
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
                <wkc-error-page description={t('bay.appLoadError')}>
                  {bay.bay.currentMicroAppError?.message}
                </wkc-error-page>
              </div>
            ) : bay.bay.isCurrentMicroAppLoading ? (
              <AppLoading></AppLoading>
            ) : null}
            <footer class="bay-footer">{t('bay.footer')}</footer>
          </div>
        </div>
      </main>
    );
  },
});

export default Main;
