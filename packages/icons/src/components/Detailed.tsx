// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Detailed = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgDetailed',
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
          <path d="M832 64a64 64 0 0 1 64 64v768a64 64 0 0 1-64 64H608a96 96 0 0 0-191.84-5.632L416 960H192a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h640zm0 64H192v768h173.312l2.048-4.48a160.096 160.096 0 0 1 137.6-91.36L512 800a160.032 160.032 0 0 1 146.112 94.72l.544 1.28H832V128zM640 512a32 32 0 0 1 0 64H384a32 32 0 0 1 0-64h256zm0-192a32 32 0 0 1 0 64H384a32 32 0 0 1 0-64h256z" />
        </svg>
      );
    };
  },
});
