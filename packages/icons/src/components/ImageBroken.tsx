// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ImageBroken = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgImageBroken',
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
        <path d="M891.728 136.528a64 64 0 0 1 64 64V857.6a64 64 0 0 1-64 64H489.84l29.632-64h295.056a16 16 0 0 0 12.656-25.792L620.848 564.784a16 16 0 0 0-25.312 0l-6.688 8.64-103.264-146.752 120-282.144-211.92 255.712 143.792 239.68-50.72 65.632L295.472 921.6h-163.2a64 64 0 0 1-64-64V200.528a64 64 0 0 1 64-64h759.456zm-601.6 204.8a85.328 85.328 0 1 0 0 170.672 85.328 85.328 0 0 0 0-170.672z" />
      </svg>
    );
  },
});
