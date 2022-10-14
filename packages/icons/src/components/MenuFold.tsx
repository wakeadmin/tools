// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const MenuFold = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgMenuFold',
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
          <path d="M677.7 292.3a12.8 12.8 0 0 0 12.8-12.8v-42.7c0-7-5.7-12.8-12.8-12.8H183.5a12.8 12.8 0 0 0-12.8 12.8v42.7a12.8 12.8 0 0 0 12.8 12.8h494.2zm182.6 375a12.8 12.8 0 0 0 3.7-9.1V336a12.8 12.8 0 0 0-21.9-9L694.6 474.5a32 32 0 0 0 0 45.2l147.5 147.5a12.8 12.8 0 0 0 18.1 0zm-267.2-136a12.8 12.8 0 0 0 12.8-12.8v-42.7c0-7-5.8-12.8-12.8-12.8H183.5a12.8 12.8 0 0 0-12.8 12.8v42.7a12.8 12.8 0 0 0 12.8 12.8h409.6zm84.6 238.9a12.8 12.8 0 0 0 12.8-12.8v-42.7c0-7.1-5.7-12.8-12.8-12.8H183.5a12.8 12.8 0 0 0-12.8 12.8v42.7a12.8 12.8 0 0 0 12.8 12.8h494.2z" />
        </svg>
      );
    };
  },
});
