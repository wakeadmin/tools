import { defineComponent } from 'vue';
import style from './Content.scss?inline';

/**
 * 页面内容
 */
export const Content = defineComponent({
  styles: [style],
  name: 'BayLayoutContent',
  setup() {
    return () => {
      return (
        <div class="bay-layout-content">
          <slot></slot>
        </div>
      );
    };
  },
});
