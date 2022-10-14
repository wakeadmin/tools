// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Share = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgShare',
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
          <path d="M716.8 70.4a134.4 134.4 0 1 1-91.008 233.312L366.272 468.96c4.576 13.504 7.04 27.968 7.04 43.04 0 20.608-4.608 40.128-12.896 57.568l247.008 171.52a134.4 134.4 0 1 1-24 61.312L319.84 619.36a134.4 134.4 0 1 1 12.064-204.384L590.336 250.4A134.4 134.4 0 0 1 716.8 70.4zm0 678.4a70.4 70.4 0 1 0 0 140.8 70.4 70.4 0 0 0 0-140.8zM238.944 441.6a70.4 70.4 0 1 0 0 140.8 70.4 70.4 0 0 0 0-140.8zM716.8 134.4a70.4 70.4 0 1 0 0 140.8 70.4 70.4 0 0 0 0-140.8z" />
        </svg>
      );
    };
  },
});
