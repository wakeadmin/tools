// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const StarFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgStarFill',
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
          <path d="m418.88 153.92-64.256 130.144c-5.056 10.24-14.784 17.312-26.048 18.944l-143.68 20.864a103.84 103.84 0 0 0-57.536 177.152l103.936 101.312c8.16 7.968 11.904 19.424 9.952 30.656l-24.512 143.04a103.84 103.84 0 0 0 150.656 109.504l128.48-67.552a34.624 34.624 0 0 1 32.224 0l128.48 67.52a103.84 103.84 0 0 0 150.688-109.44L782.72 632.992c-1.92-11.232 1.792-22.72 9.952-30.656L896.64 501.024a103.84 103.84 0 0 0-57.6-177.152l-143.616-20.864a34.624 34.624 0 0 1-26.048-18.944L605.12 153.92a103.84 103.84 0 0 0-186.24 0z" />
        </svg>
      );
    };
  },
});
