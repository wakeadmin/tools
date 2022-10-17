// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const ArrowDown = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgArrowDown',
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
          <path d="m916.48 312.608-370.56 389.76a47.104 47.104 0 0 1-64.256 3.392l-3.552-3.392L107.52 312.64a3.2 3.2 0 0 1 2.304-5.408h86.4a6.4 6.4 0 0 1 4.608 1.984L512 636.384l311.136-327.2a6.4 6.4 0 0 1 4.64-1.984h86.4a3.2 3.2 0 0 1 2.304 5.408z" />
        </svg>
      );
    };
  },
});
