// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const MenuUnfold = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgMenuUnfold',
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
        <path d="M356.992 701.856a12.8 12.8 0 0 0-12.8 12.8v42.688c0 7.04 5.728 12.8 12.8 12.8H851.2a12.8 12.8 0 0 0 12.8-12.8v-42.688a12.8 12.8 0 0 0-12.8-12.8H356.992zM174.4 326.912a12.8 12.8 0 0 0-3.744 9.056v322.208a12.8 12.8 0 0 0 21.856 9.024l147.52-147.52a32 32 0 0 0 0-45.248l-147.52-147.52a12.8 12.8 0 0 0-18.112 0zm267.2 136a12.8 12.8 0 0 0-12.8 12.8V518.4c0 7.04 5.76 12.8 12.8 12.8h409.6a12.8 12.8 0 0 0 12.8-12.8v-42.656a12.8 12.8 0 0 0-12.8-12.8H441.6zM356.992 224a12.8 12.8 0 0 0-12.8 12.8v42.656c0 7.072 5.728 12.8 12.8 12.8H851.2a12.8 12.8 0 0 0 12.8-12.8V236.8a12.8 12.8 0 0 0-12.8-12.8H356.992z" />
      </svg>
    );
  },
});
