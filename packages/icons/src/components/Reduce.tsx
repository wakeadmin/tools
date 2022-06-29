// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Reduce = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgReduce',
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
        <path d="M512 68.256c245.056 0 443.744 198.688 443.744 443.744 0 245.056-198.688 443.744-443.744 443.744-245.056 0-443.744-198.688-443.744-443.744C68.256 266.944 266.944 68.256 512 68.256zm0 64c-209.728 0-379.744 170.016-379.744 379.744 0 209.728 170.016 379.744 379.744 379.744 209.728 0 379.744-170.016 379.744-379.744 0-209.728-170.016-379.744-379.744-379.744zm172.8 345.6a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32H339.2a32 32 0 0 1-32-32v-4.288a32 32 0 0 1 32-32h345.6z" />
      </svg>
    );
  },
});
