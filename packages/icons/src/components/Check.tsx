// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Check = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgCheck',
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
          <path d="M427.904 794.56a6.4 6.4 0 0 1-9.056 0l-288.96-289.024a6.4 6.4 0 0 1 0-9.056l36.16-36.16a6.4 6.4 0 0 1 9.088 0L423.36 708.544 875.936 256l45.248 45.248-493.28 493.312z" />
        </svg>
      );
    };
  },
});
