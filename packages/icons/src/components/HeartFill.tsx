// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const HeartFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgHeartFill',
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
          <path d="m903.637 545.877.555.598L512 938.667 119.808 546.475l.555-.598A277.333 277.333 0 0 1 512 155.307a277.333 277.333 0 0 1 391.637 390.57z" />
        </svg>
      );
    };
  },
});
