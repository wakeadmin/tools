// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Play = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgPlay',
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
          <path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zm0 64C298.016 128 128 298.016 128 507.744c0 209.696 170.016 379.712 379.744 379.712 209.696 0 379.712-170.016 379.712-379.712C887.456 298.016 717.44 128 507.744 128zM448.64 368a17.92 17.92 0 0 1 10.816 3.552l190.72 145.216A13.664 13.664 0 0 1 652 537.632a15.84 15.84 0 0 1-1.824 1.6l-190.72 145.216a18.112 18.112 0 0 1-23.456-1.6 13.856 13.856 0 0 1-4-9.6V382.784c0-8.16 7.456-14.784 16.64-14.784z" />
        </svg>
      );
    };
  },
});
