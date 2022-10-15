// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Send = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgSend',
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
          <path d="M946.176 121.824a34.15 34.15 0 0 1 0 23.776L658.4 920.384a34.144 34.144 0 0 1-56.128 12.256l-176.32-176.32-121.856 113.92C280.8 892 243.872 872.8 246.752 842.4l.544-3.712 38.336-194.432a33.986 33.986 0 0 1 7.84-15.936l2.24-2.24-180.48-180.48a34.144 34.144 0 0 1 12.288-56.096l774.752-287.776a34.144 34.144 0 0 1 43.904 20.096zm-89.92 69.824L201.152 434.944 347.2 580.992 715.264 259.52a34.144 34.144 0 0 1 47.936 48.416l-3.04 3.008-364.608 318.368 217.376 217.376 243.328-655.072zM348.352 678.72l-13.632 69.376 42.912-40.128-29.28-29.248z" />
        </svg>
      );
    };
  },
});
