// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Expand = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgExpand',
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
          <path d="M853.333 213.333a42.667 42.667 0 0 0-42.666-42.666H597.333a42.667 42.667 0 0 0 0 85.333h109.654L567.04 396.373a42.667 42.667 0 0 0 0 60.587 42.667 42.667 0 0 0 60.587 0L768 316.587v110.08a42.667 42.667 0 0 0 42.667 42.666 42.667 42.667 0 0 0 42.666-42.666zM456.96 567.04a42.667 42.667 0 0 0-60.587 0L256 706.987V597.333a42.667 42.667 0 0 0-42.667-42.666 42.667 42.667 0 0 0-42.666 42.666v213.334a42.667 42.667 0 0 0 42.666 42.666h213.334a42.667 42.667 0 0 0 0-85.333h-110.08L456.96 627.627a42.667 42.667 0 0 0 0-60.587z" />
        </svg>
      );
    };
  },
});
