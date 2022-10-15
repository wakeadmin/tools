// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const LabelFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgLabelFill',
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
          <path d="m598.912 97.12 6.08 1.184 224.192 51.744c20.672 4.768 37.12 20.096 43.52 40.096l1.28 4.672 51.712 224.224a89.632 89.632 0 0 1-19.744 79.04l-4.224 4.48-399.136 399.2a89.664 89.664 0 0 1-122.496 4.032l-4.288-4.032L122.24 648.192a89.664 89.664 0 0 1-4.032-122.464l4.032-4.32 399.168-399.136a89.632 89.632 0 0 1 77.504-25.152zm136.096 191.872a89.632 89.632 0 1 0-126.784 126.784A89.632 89.632 0 0 0 735.04 288.96z" />
        </svg>
      );
    };
  },
});
