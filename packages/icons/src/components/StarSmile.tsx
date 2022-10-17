// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const StarSmile = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgStarSmile',
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
          <path d="m418.88 153.92-64.256 130.144c-5.056 10.24-14.784 17.312-26.048 18.944l-143.68 20.864a103.84 103.84 0 0 0-57.536 177.152l103.936 101.312c8.16 7.968 11.904 19.424 9.952 30.656l-24.512 143.04a103.84 103.84 0 0 0 150.656 109.504l128.48-67.552a34.624 34.624 0 0 1 32.224 0l128.48 67.52a103.84 103.84 0 0 0 150.688-109.44L782.72 632.992c-1.92-11.232 1.792-22.72 9.952-30.656L896.64 501.024a103.84 103.84 0 0 0-57.6-177.152l-143.616-20.864a34.624 34.624 0 0 1-26.048-18.944L605.12 153.92a103.84 103.84 0 0 0-186.24 0zm108.448 14.912a34.37 34.37 0 0 1 15.68 15.712l64.256 130.176a103.84 103.84 0 0 0 78.208 56.8l143.648 20.896a34.624 34.624 0 0 1 19.2 59.04L744.352 552.768a103.84 103.84 0 0 0-29.856 91.936l24.544 143.04a34.624 34.624 0 0 1-50.24 36.48l-128.48-67.52a103.84 103.84 0 0 0-96.64 0l-128.48 67.52a34.624 34.624 0 0 1-50.24-36.48l24.544-143.04a103.84 103.84 0 0 0-29.888-91.936L175.68 451.456a34.624 34.624 0 0 1 19.2-59.04l143.648-20.896a103.84 103.84 0 0 0 78.176-56.8l64.256-130.176a34.624 34.624 0 0 1 46.368-15.712zM608 480a32 32 0 0 1 32 32 128 128 0 1 1-256 0 32 32 0 0 1 64 0 64 64 0 0 0 127.84 4.8l.16-4.8a32 32 0 0 1 32-32z" />
        </svg>
      );
    };
  },
});
