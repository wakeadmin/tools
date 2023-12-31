// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const ArrowRight = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgArrowRight',
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
          <path d="m312.608 916.48 389.76-370.56a47.104 47.104 0 0 0 3.392-64.256l-3.392-3.552L312.64 107.52a3.2 3.2 0 0 0-5.408 2.304v86.4a6.4 6.4 0 0 0 1.984 4.608L636.384 512l-327.2 311.104a6.4 6.4 0 0 0-1.984 4.64v86.4a3.2 3.2 0 0 0 5.408 2.304z" />
        </svg>
      );
    };
  },
});
