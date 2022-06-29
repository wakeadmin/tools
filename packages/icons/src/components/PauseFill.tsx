// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const PauseFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgPauseFill',
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
        <path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zM473.6 352h-51.2a6.4 6.4 0 0 0-6.4 6.4v307.2c0 3.52 2.88 6.4 6.4 6.4h51.2a6.4 6.4 0 0 0 6.4-6.4V358.4a6.4 6.4 0 0 0-6.4-6.4zm128 0h-51.2a6.4 6.4 0 0 0-6.4 6.4v307.2c0 3.52 2.88 6.4 6.4 6.4h51.2a6.4 6.4 0 0 0 6.4-6.4V358.4a6.4 6.4 0 0 0-6.4-6.4z" />
      </svg>
    );
  },
});
