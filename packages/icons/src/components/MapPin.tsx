// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const MapPin = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgMapPin',
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
          <path d="M783.53 740.864 512 1012.394l-271.53-271.53a384 384 0 1 1 543.06 0zM512 554.667A85.333 85.333 0 1 0 512 384a85.333 85.333 0 0 0 0 170.667z" />
        </svg>
      );
    };
  },
});
