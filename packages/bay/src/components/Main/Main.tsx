import { defineComponent, Suspense } from 'vue';
import { DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX } from '@wakeadmin/mapp/main';

import { useAsset, useBodyClass } from '@/hooks';

import { Header, HeaderFallback } from '../Header';
import { Sidebar, SidebarFallback } from '../Sidebar';

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
            <div class="bay-app-landing" id={DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX}>
              {/* 微应用将挂载到这里 */}
            </div>
            <div class="bay-footer">{FOOTER.value}</div>
          </div>
        </div>
      </main>
    );
  },
});

export default Main;
