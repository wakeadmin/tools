// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const CardbagFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgCardbagFill',
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
          d="m809.408 163.712 1.568 5.312L834.24 256h36.16c47.712 0 86.72 39.968 89.44 90.368L960 352v448c0 53.024-40.128 96-89.6 96H153.6c-49.472 0-89.6-42.976-89.6-96V352c0-48.96 34.176-89.312 78.336-95.264A79.251 79.251 0 0 1 167.2 242.4l6.08-1.92L702.304 98.72c45.76-12.224 91.776 17.792 107.104 64.96zM832 450.432a32 32 0 0 0-32 32v192a32 32 0 0 0 64 0v-192a32 32 0 0 0-32-32zM721.472 160.128l-2.592.448L362.624 256H768l-18.88-70.4c-4.448-16.672-17.088-26.4-27.648-25.472z"
        />
      </svg>
    );
  },
});
