// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const PlusCircleFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgPlusCircleFill',
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
          <path d="M512 68.256c245.056 0 443.744 198.688 443.744 443.744 0 245.056-198.688 443.744-443.744 443.744-245.056 0-443.744-198.688-443.744-443.744C68.256 266.944 266.944 68.256 512 68.256zm2.144 238.944h-4.288a32 32 0 0 0-32 32v138.656H339.2a32 32 0 0 0-32 32v4.288a32 32 0 0 0 32 32l138.656-.032V684.8a32 32 0 0 0 32 32h4.288a32 32 0 0 0 32-32l-.032-138.688H684.8a32 32 0 0 0 32-32v-4.256a32 32 0 0 0-32-32H546.112V339.2a32 32 0 0 0-32-32z" />
        </svg>
      );
    };
  },
});
