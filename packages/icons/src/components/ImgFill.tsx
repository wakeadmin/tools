// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ImgFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgImgFill',
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
        <path
          fill="currentColor"
          d="M891.744 136.544a64 64 0 0 1 64 64V857.6a64 64 0 0 1-64 64H132.256a64 64 0 0 1-64-64V200.544a64 64 0 0 1 64-64h759.488zM588.64 575.424a32 32 0 0 0-5.76 5.76L409.12 806.016A32 32 0 0 0 434.4 857.6h347.52a32 32 0 0 0 25.344-51.584l-173.76-224.832a32 32 0 0 0-44.864-5.76zm-298.496-234.08a85.344 85.344 0 1 0 0 170.656 85.344 85.344 0 0 0 0-170.656z"
        />
      </svg>
    );
  },
});
