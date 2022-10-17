// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Menu = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgMenu',
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
          <path d="M904.544 763.744c7.04 0 12.8 5.728 12.8 12.8V832a12.8 12.8 0 0 1-12.8 12.8H119.456a12.8 12.8 0 0 1-12.8-12.8v-55.456c0-7.072 5.76-12.8 12.8-12.8h785.088zm0-283.744c7.04 0 12.8 5.76 12.8 12.8v55.456a12.8 12.8 0 0 1-12.8 12.8H119.456a12.8 12.8 0 0 1-12.8-12.8V492.8c0-7.04 5.76-12.8 12.8-12.8h785.088zm0-283.744c7.04 0 12.8 5.76 12.8 12.8v55.488a12.8 12.8 0 0 1-12.8 12.8H119.456a12.8 12.8 0 0 1-12.8-12.8v-55.488c0-7.04 5.76-12.8 12.8-12.8h785.088z" />
        </svg>
      );
    };
  },
});
