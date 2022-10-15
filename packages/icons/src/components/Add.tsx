// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Add = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgAdd',
  inheritAttrs: true,
  setup() {
    const vm = getCurrentInstance()?.proxy;
    return () => {
      let fallthroughProps: any;

      if (isVue2) {
        fallthroughProps = {
          // @ts-ignore
          on: vm?.$listeners,
        };
      }
      return (
        <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
          <path d="M512 68.256c245.056 0 443.744 198.688 443.744 443.744 0 245.056-198.688 443.744-443.744 443.744-245.056 0-443.744-198.688-443.744-443.744C68.256 266.944 266.944 68.256 512 68.256zm0 64c-209.728 0-379.744 170.016-379.744 379.744 0 209.728 170.016 379.744 379.744 379.744 209.728 0 379.744-170.016 379.744-379.744 0-209.728-170.016-379.744-379.744-379.744zm2.144 174.944a32 32 0 0 1 32 32l-.032 138.656H684.8a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32l-138.688-.032V684.8a32 32 0 0 1-32 32h-4.256a32 32 0 0 1-32-32V546.112H339.2a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h138.656V339.2a32 32 0 0 1 32-32h4.288z" />
        </svg>
      );
    };
  },
});
