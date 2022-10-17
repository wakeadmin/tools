// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const ApiFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgApiFill',
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
          <path d="m422.336 387.744 49.152 49.152-73.728 73.696 98.24 98.24 73.76-73.664 49.12 49.12-73.696 73.696 19.648 19.648c15.2 15.2 16.224 39.232 3.04 55.584l-3.04 3.392L459.2 842.24a191.104 191.104 0 0 1-257.408 11.744l-84.16 84.128a6.4 6.4 0 0 1-9.024 0l-40.096-40.096a6.4 6.4 0 0 1 0-9.056l84.128-84.128a191.104 191.104 0 0 1 11.744-257.408l105.632-105.6a41.696 41.696 0 0 1 58.976 0l19.616 19.616 73.728-73.696zM915.392 68.512l40.096 40.096a6.4 6.4 0 0 1 0 9.056l-84.128 84.16A191.104 191.104 0 0 1 859.616 459.2L753.984 564.832a41.696 41.696 0 0 1-58.976 0l-235.84-235.84a41.696 41.696 0 0 1 0-58.976L564.8 164.384a191.104 191.104 0 0 1 257.408-11.744l84.16-84.128a6.4 6.4 0 0 1 9.024 0z" />
        </svg>
      );
    };
  },
});
