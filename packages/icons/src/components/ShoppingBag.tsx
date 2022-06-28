// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ShoppingBag = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgShoppingBag',
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
          d="M800 64a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zm0 64H224a32 32 0 0 0-32 32v704a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32zM672 256a32 32 0 0 1 31.776 28.256L704 288v26.656a192 192 0 0 1-383.872 7.2l-.128-7.2V288a32 32 0 0 1 63.776-3.744L384 288v26.656a128 128 0 0 0 255.84 6.4l.16-6.4V288a32 32 0 0 1 32-32z"
        />
      </svg>
    );
  },
});
