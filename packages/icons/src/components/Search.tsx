// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Search = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgSearch',
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
          <path d="M443.744 68.256c207.36 0 375.456 168.128 375.456 375.488 0 100.064-39.168 191.04-103.008 258.336l215.2 215.168a32 32 0 0 1 0 45.248l-3.008 3.04a32 32 0 0 1-45.28 0l-218.24-218.304a373.76 373.76 0 0 1-221.12 71.968c-207.36 0-375.488-168.096-375.488-375.456S236.384 68.256 443.744 68.256zm0 68.288a307.2 307.2 0 1 0 0 614.4 307.2 307.2 0 0 0 0-614.4z" />
        </svg>
      );
    };
  },
});
