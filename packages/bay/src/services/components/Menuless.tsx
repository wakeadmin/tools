import { defineComponent, onBeforeUnmount } from 'vue';
import { useBayModel } from '@/hooks';

/**
 * 隐藏菜单布局
 */
export const Menuless = defineComponent({
  name: 'BayMenuless',
  props: {
    animate: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props) {
    const bay = useBayModel();

    bay.hideMenu(props.animate);

    onBeforeUnmount(() => {
      bay.showMenu(props.animate);
    });

    return () => (
      <div class="bay-layout-menuless">
        <slot></slot>
      </div>
    );
  },
});
