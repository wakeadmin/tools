// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const LineChart = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgLineChart',
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
          <path d="M923.744 853.344a32 32 0 0 1 32 32v4.256a32 32 0 0 1-32 32H100.256a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h823.488zm-614.4-477.888a32 32 0 0 1 32 32V787.2a32 32 0 0 1-32 32h-140.8a32 32 0 0 1-32-32V407.456a32 32 0 0 1 32-32h140.8zm546.112 102.4a32 32 0 0 1 32 32V787.2a32 32 0 0 1-32 32h-140.8a32 32 0 0 1-32-32V509.856a32 32 0 0 1 32-32h140.8zM582.4 170.656a32 32 0 0 1 32 32V787.2a32 32 0 0 1-32 32H441.6a32 32 0 0 1-32-32V202.656a32 32 0 0 1 32-32h140.8z" />
        </svg>
      );
    };
  },
});
