// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Sort = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgSort',
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
          <path d="M770.528 676.384 533.664 925.472a30.08 30.08 0 0 1-41.056 2.176l-2.24-2.176-236.896-249.088a2.048 2.048 0 0 1 1.472-3.456h55.232c1.12 0 2.176.48 2.944 1.28L512 883.296l198.848-209.12a4.096 4.096 0 0 1 2.976-1.28h55.232a2.048 2.048 0 0 1 1.472 3.488zm0-330.272L533.664 96.96a30.08 30.08 0 0 0-41.056-2.144l-2.24 2.144-236.896 249.088a2.048 2.048 0 0 0 1.472 3.456h55.232a4.096 4.096 0 0 0 2.944-1.28L512 139.2l198.848 209.12a4.042 4.042 0 0 0 2.976 1.28h55.232a2.048 2.048 0 0 0 1.472-3.456z" />
        </svg>
      );
    };
  },
});
