/**
 * 浮动 footer
 */
import { useDisposer } from '@/hooks';
import { defineComponent, onMounted, ref } from 'vue';
import style from './FloatFooter.scss?inline';

export const FloatFooter = defineComponent({
  name: 'BayLayoutFloatFooter',
  styles: [style],
  inheritAttrs: false,
  setup() {
    const disposer = useDisposer();
    const left = ref<string | number>(0);
    const elRef = ref<HTMLDivElement>();
    const bayContentEle = document.querySelector('#bay-content');

    onMounted(() => {
      const el = bayContentEle || elRef.value;
      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver(entries => {
        const entry = entries[0];
        if (entry) {
          left.value = `${el.getBoundingClientRect().left}px`;
        }
      });

      resizeObserver.observe(el);

      disposer.push(() => resizeObserver.disconnect());
    });

    return () => (
      <>
        <footer part="body" class="bay-layout-float-footer" style={{ left: left.value }}>
          <slot />
        </footer>
        <div class="bay-layout-float-footer__placeholder"></div>
        <div class="bay-layout-float-footer__watcher" ref={elRef}></div>
      </>
    );
  },
});
