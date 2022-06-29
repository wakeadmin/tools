// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Pause = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgPause',
  inheritAttrs: true,
  render() {
    let fallthroughProps: any;

    if (isVue2) {
      fallthroughProps = {
        // @ts-expect-error
        on: this.$listeners,
      };
    }
    return (
      <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
        <path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zm0 64C298.016 128 128 298.016 128 507.744c0 209.696 170.016 379.712 379.744 379.712 209.696 0 379.712-170.016 379.712-379.712C887.456 298.016 717.44 128 507.744 128zM473.6 352c3.52 0 6.4 2.88 6.4 6.4v307.2a6.4 6.4 0 0 1-6.4 6.4h-51.2a6.4 6.4 0 0 1-6.4-6.4V358.4c0-3.52 2.88-6.4 6.4-6.4h51.2zm128 0c3.52 0 6.4 2.88 6.4 6.4v307.2a6.4 6.4 0 0 1-6.4 6.4h-51.2a6.4 6.4 0 0 1-6.4-6.4V358.4c0-3.52 2.88-6.4 6.4-6.4h51.2z" />
      </svg>
    );
  },
});
