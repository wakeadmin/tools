// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Close = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgClose',
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
          <path d="M825.76 246.496 560.256 512 825.76 777.504l-48.256 48.256-265.536-265.504L246.496 825.76l-48.256-48.256 265.472-265.536L198.24 246.496l48.256-48.256L512 463.744 777.504 198.24z" />
        </svg>
      );
    };
  },
});
