// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Order = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgOrder',
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
        <path d="M800 64H224a96 96 0 0 0-96 96v704a96 96 0 0 0 96 96h576a96 96 0 0 0 96-96V160a96 96 0 0 0-96-96zm-576 64h576a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm128 192h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32Zm0 160h192a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z" />
      </svg>
    );
  },
});
