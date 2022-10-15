// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Spin = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgSpin',
  inheritAttrs: true,
  setup() {
    const vm = getCurrentInstance()?.proxy;
    return () => {
      let fallthroughProps: any;

      if (isVue2) {
        fallthroughProps = {
          // @ts-ignore
          on: vm?.$listeners,
        };
      }
      return (
        <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
          <path d="M514.656 720a32 32 0 0 1 32 32v144a32 32 0 0 1-32 32h-5.312a32 32 0 0 1-32-32V752a32 32 0 0 1 32-32h5.312zm191.552-62.816 101.824 101.824a32 32 0 0 1 0 45.248l-3.776 3.776a32 32 0 0 1-45.248 0L657.184 706.208a32 32 0 0 1 0-45.248l3.776-3.776a32 32 0 0 1 45.248 0zm-343.168 0 3.776 3.776a32 32 0 0 1 0 45.248L264.96 808.032a32 32 0 0 1-45.248 0l-3.776-3.776a32 32 0 0 1 0-45.248L317.76 657.184a32 32 0 0 1 45.248 0zM896 477.344a32 32 0 0 1 32 32v5.312a32 32 0 0 1-32 32H752a32 32 0 0 1-32-32v-5.312a32 32 0 0 1 32-32h144zm-624 0a32 32 0 0 1 32 32v5.312a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32v-5.312a32 32 0 0 1 32-32h144zm532.256-261.376 3.776 3.776a32 32 0 0 1 0 45.248L706.208 366.816a32 32 0 0 1-45.248 0l-3.776-3.776a32 32 0 0 1 0-45.248l101.824-101.824a32 32 0 0 1 45.248 0zm-539.264 0 101.824 101.824a32 32 0 0 1 0 45.248l-3.776 3.776a32 32 0 0 1-45.248 0L215.968 264.96a32 32 0 0 1 0-45.248l3.776-3.776a32 32 0 0 1 45.248 0zM514.656 96a32 32 0 0 1 32 32v144a32 32 0 0 1-32 32h-5.312a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32h5.312z" />
        </svg>
      );
    };
  },
});
