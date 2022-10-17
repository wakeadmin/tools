// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const PlayFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgPlayFill',
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
          <path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zM448.64 336c-9.184 0-16.64 6.624-16.64 14.784v290.432c0 3.52 1.408 6.944 4 9.6a18.112 18.112 0 0 0 23.456 1.6l190.72-145.184a15.84 15.84 0 0 0 1.824-1.6 13.664 13.664 0 0 0-1.824-20.864l-190.72-145.216A17.92 17.92 0 0 0 448.64 336z" />
        </svg>
      );
    };
  },
});
