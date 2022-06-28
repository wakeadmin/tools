// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Upload = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgUpload',
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
          d="M921.6 610.912a32 32 0 0 1 31.776 28.256l.224 3.744V776.48c0 54.272-38.784 99.968-89.536 103.04l-5.472.192H165.408c-51.552 0-92.128-43.84-94.848-97.472l-.16-5.76v-133.6a32 32 0 0 1 63.776-3.744l.224 3.744v133.568c0 20.992 12.896 36.96 27.808 39.04l3.2.192h693.184c15.104 0 29.024-14.592 30.816-34.816l.192-4.416V642.88a32 32 0 0 1 32-32zM558.496 149.728l3.712 3.488L727.712 318.72a32 32 0 0 1-42.464 47.712l-2.784-2.464-136.352-136.32v411.296a32 32 0 0 1-32 32h-4.256a32 32 0 0 1-32-32V227.648l-136.32 136.32a32 32 0 0 1-47.744-42.464l2.496-2.784 165.504-165.504a71.04 71.04 0 0 1 96.704-3.488z"
        />
      </svg>
    );
  },
});
