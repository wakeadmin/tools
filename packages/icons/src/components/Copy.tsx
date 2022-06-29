// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Copy = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgCopy',
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
        <path d="M832 288a96 96 0 0 1 96 96v448a96 96 0 0 1-96 96H384a96 96 0 0 1-96-96V384a96 96 0 0 1 96-96zm0 64H384a32 32 0 0 0-32 32v448a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V384a32 32 0 0 0-32-32zM640 96a96 96 0 0 1 95.84 90.368L736 192v32.544a32 32 0 0 1-63.776 3.744l-.224-3.744V192a32 32 0 0 0-28.256-31.776L640 160H192a32 32 0 0 0-31.776 28.256L160 192v448a32 32 0 0 0 28.256 31.776L192 672h33.568a32 32 0 0 1 3.712 63.776l-3.68.224H192a96 96 0 0 1-95.84-90.368L96 640V192a96 96 0 0 1 90.368-95.84L192 96h448z" />
      </svg>
    );
  },
});
