import { defineComponent } from 'vue';
import style from './Fullscreen.scss?inline';

export const Fullscreen = defineComponent({
  name: 'BayLayoutFullscreen',
  styles: [style],
  render() {
    return (
      <div class="bay-layout-fullscreen">
        <slot></slot>
      </div>
    );
  },
});
