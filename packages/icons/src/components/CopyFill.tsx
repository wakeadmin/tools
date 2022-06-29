// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const CopyFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgCopyFill',
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
        <path d="M832 288a96 96 0 0 1 96 96v448a96 96 0 0 1-96 96H384a96 96 0 0 1-96-96V384a96 96 0 0 1 96-96zM640 96a96 96 0 0 1 95.84 90.368L736 192v32H320a96 96 0 0 0-96 96v416h-32a96 96 0 0 1-95.84-90.368L96 640V192a96 96 0 0 1 90.368-95.84L192 96h448z" />
      </svg>
    );
  },
});
