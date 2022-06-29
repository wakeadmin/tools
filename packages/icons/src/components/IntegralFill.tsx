// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const IntegralFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgIntegralFill',
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
        <path d="M673.152 64a64 64 0 0 1 48.864 22.656l158.848 187.712A64 64 0 0 1 896 315.712V864a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zM640 576H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64zm0-192H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64z" />
      </svg>
    );
  },
});
