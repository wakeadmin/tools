import { defineComponent, Suspense } from 'vue';
import { DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX } from '@wakeadmin/mapp/main';

import { useBodyClass } from '@/hooks';

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

    return () => (
      <main class="bay">
        <Suspense v-slots={{ fallback: () => <HeaderFallback /> }}>
          <Header />
        </Suspense>
        <div class="bay-body">
          <Suspense v-slots={{ fallback: () => <SidebarFallback /> }}>
            <Sidebar />
          </Suspense>
          <div class="bay-content" id={DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX}></div>
        </div>
      </main>
    );
  },
});

export default Main;
