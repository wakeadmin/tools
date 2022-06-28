// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Delete = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgDelete',
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
          d="M598.4 68.256a16 16 0 0 1 16 16v52.256h309.344a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32H883.84l-35.68 684.448a34.144 34.144 0 0 1-34.08 32.352H209.888a34.144 34.144 0 0 1-34.08-32.352l-35.744-684.48-39.808.032a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32H409.6l.032-52.288a16 16 0 0 1 16-16h172.8zM815.52 204.8H208.48l33.76 648.544h539.424L815.52 204.8zM411.744 375.456a32 32 0 0 1 32 32v243.2a32 32 0 0 1-32 32h-4.288a32 32 0 0 1-32-32v-243.2a32 32 0 0 1 32-32h4.288zm204.8 0a32 32 0 0 1 32 32v243.2a32 32 0 0 1-32 32h-4.288a32 32 0 0 1-32-32v-243.2a32 32 0 0 1 32-32h4.288z"
        />
      </svg>
    );
  },
});
