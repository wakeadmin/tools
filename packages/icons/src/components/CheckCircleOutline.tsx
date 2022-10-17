// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const CheckCircleOutline = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgCheckCircleOutline',
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
          <path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zm0 64C298.016 128 128 298.016 128 507.744c0 209.696 170.016 379.712 379.744 379.712 209.696 0 379.712-170.016 379.712-379.712C887.456 298.016 717.44 128 507.744 128zm224.544 264.672 7.136 7.392a16 16 0 0 1-.384 22.624L462.816 689.44a16 16 0 0 1-22.624-.384l-155.488-160.96a16 16 0 0 1 .416-22.656l.128-.128 12.256-11.52a16 16 0 0 1 21.76-.192l133.12 121.44 257.92-223.36a16 16 0 0 1 21.984.992z" />
        </svg>
      );
    };
  },
});
