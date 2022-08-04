import { defineComponent, onBeforeUnmount } from 'vue';
import { useBayModel } from '@/hooks';

/**
 * 隐藏菜单布局
 */
export const Menuless = defineComponent({
  name: 'BayMenuless',
  setup() {
    const bay = useBayModel();

    bay.hideMenu();

    onBeforeUnmount(() => {
      bay.showMenu();
    });

    return () => (
      <div class="bay-layout-menuless">
        <slot></slot>
      </div>
    );
  },
});
