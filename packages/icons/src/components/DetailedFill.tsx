// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const DetailedFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgDetailedFill',
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
          d="M832 64a64 64 0 0 1 64 64v768a64 64 0 0 1-64 64H608a96 96 0 0 0-191.84-5.632L416 960H192a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h640zM640 512H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64zm0-192H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64z"
        />
      </svg>
    );
  },
});
