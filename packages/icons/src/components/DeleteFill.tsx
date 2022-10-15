// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const DeleteFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgDeleteFill',
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
          <path d="M598.4 68.256a16 16 0 0 1 16 16v52.256h309.344a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32H883.84l-35.68 684.448a34.144 34.144 0 0 1-34.08 32.352H209.888a34.144 34.144 0 0 1-34.08-32.352l-35.744-684.48-39.808.032a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32H409.6l.032-52.288a16 16 0 0 1 16-16h172.8zm-186.656 307.2h-4.288a32 32 0 0 0-32 32v243.2a32 32 0 0 0 32 32h4.288a32 32 0 0 0 32-32v-243.2a32 32 0 0 0-32-32zm204.8 0h-4.288a32 32 0 0 0-32 32v243.2a32 32 0 0 0 32 32h4.288a32 32 0 0 0 32-32v-243.2a32 32 0 0 0-32-32z" />
        </svg>
      );
    };
  },
});
