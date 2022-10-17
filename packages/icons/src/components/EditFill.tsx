// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const EditFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgEditFill',
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
          <path d="M908.8 857.44c7.04 0 12.8 5.728 12.8 12.8v42.656a12.8 12.8 0 0 1-12.8 12.8H115.2a12.8 12.8 0 0 1-12.8-12.8V870.24c0-7.072 5.76-12.8 12.8-12.8h793.6zm-135.456-728.8a35.2 35.2 0 0 1 48.96-.032l85.44 82.496c13.952 13.536 14.336 35.84.448 50.176l-526.24 510.08-135.36 43.328a35.2 35.2 0 0 1-44.064-44.864l44.704-131.264z" />
        </svg>
      );
    };
  },
});
