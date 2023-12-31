// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const IntegralFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgIntegralFill',
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
          <path d="M512 832c229.76 0 416-57.28 416-128 0-36.032-48.384-68.576-126.272-91.84C726.848 589.76 624.64 576 512 576c-127.36 0-241.376 17.6-317.696 45.344C132.992 643.648 96 672.512 96 704c0 70.72 186.24 128 416 128zm0-256c112.64 0 214.816 13.76 289.728 36.16 27.52 8.192 51.328 17.6 70.624 27.84-71.936 38.272-206.4 64-360.352 64-153.984 0-288.448-25.76-360.352-64 12.416-6.592 26.72-12.832 42.656-18.656C270.624 593.6 384.64 576 512 576zm0 64c229.76 0 416-57.28 416-128 0-39.2-57.216-74.24-147.36-97.728C708.16 395.392 614.4 384 512 384c-108.992 0-208.192 12.896-282.336 33.984C147.456 441.376 96 474.88 96 512c0 70.72 186.24 128 416 128zm0-256c102.4 0 196.16 11.392 268.64 30.272 36.48 9.504 67.616 20.928 91.712 33.728-71.936 38.272-206.4 64-360.352 64-153.984 0-288.448-25.76-360.352-64 21.024-11.2 47.36-21.28 78.016-30.016C303.808 396.896 403.008 384 512 384zM96 320a416 128 0 1 0 832 0 416 128 0 1 0-832 0Z" />
        </svg>
      );
    };
  },
});
