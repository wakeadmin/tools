// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const More = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgMore',
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
          <path d="M204.8 443.744a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512zm307.2 0a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512zm307.2 0a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512z" />
        </svg>
      );
    };
  },
});
