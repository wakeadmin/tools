// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Time = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgTime',
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
          <path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zm0 64.64c-211.744 0-383.36 171.584-383.36 383.36S300.224 895.36 512 895.36 895.36 723.776 895.36 512 723.776 128.64 512 128.64zm-28 193.824c17.856 0 32.32 14.464 32.32 32.32V516.32h226.144a32.32 32.32 0 1 1 0 64.608H484a32.32 32.32 0 0 1-32.32-32.32V354.784c0-17.856 14.464-32.32 32.32-32.32z" />
        </svg>
      );
    };
  },
});
