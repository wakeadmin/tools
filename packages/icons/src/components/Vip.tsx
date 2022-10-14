// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Vip = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgVip',
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
          <path d="M713.344 96c38.656 0 74.08 21.568 91.84 55.872l111.232 214.72c18.24 35.2 14.72 77.696-8.96 109.44L594.88 894.784a103.488 103.488 0 0 1-165.824 0L116.544 476.032a103.488 103.488 0 0 1-8.96-109.44l111.2-214.72A103.488 103.488 0 0 1 310.656 96h402.688zm0 68.992H310.656c-12.864 0-24.672 7.168-30.624 18.624L168.864 398.304c-6.08 11.712-4.928 25.92 2.976 36.48l312.512 418.752c10.528 14.08 29.76 17.856 44.64 9.376l3.648-2.368a34.63 34.63 0 0 0 7.008-7.008L852.16 434.784c7.904-10.56 9.056-24.768 2.976-36.48l-111.168-214.72a34.496 34.496 0 0 0-30.624-18.592zm-75.104 126.08a32 32 0 0 1 32 32v5.024a32 32 0 0 1-32 32H357.28a32 32 0 0 1-32-32v-4.992a32 32 0 0 1 32-32h280.96z" />
        </svg>
      );
    };
  },
});
