// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Collapse = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgCollapse',
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
          <path d="M810.667 384h-110.08L840.96 243.627a42.667 42.667 0 1 0-60.587-60.587L640 322.987V213.333a42.667 42.667 0 0 0-42.667-42.666 42.667 42.667 0 0 0-42.666 42.666v213.334a42.667 42.667 0 0 0 42.666 42.666h213.334a42.667 42.667 0 0 0 0-85.333zm-384 170.667H213.333a42.667 42.667 0 0 0 0 85.333h109.654L183.04 780.373a42.667 42.667 0 0 0 0 60.587 42.667 42.667 0 0 0 60.587 0L384 700.587v110.08a42.667 42.667 0 0 0 42.667 42.666 42.667 42.667 0 0 0 42.666-42.666V597.333a42.667 42.667 0 0 0-42.666-42.666z" />
        </svg>
      );
    };
  },
});
