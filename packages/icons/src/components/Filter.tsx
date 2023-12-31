// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Filter = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgFilter',
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
          <path d="M513.6 891.499c-5.333 0-10.133-1.6-14.421-4.822-6.4-4.8-123.883-106.794-123.883-106.794a25.13 25.13 0 0 1-7.467-17.622V462.165L150.485 211.712c-8.533-10.667-6.933-26.688 4.267-35.243 4.267-3.2 10.155-5.333 15.488-5.333h574.592c6.933 0 12.8 2.667 17.621 7.467 4.8 4.821 7.467 11.221 7.467 17.621 0 5.888-2.133 11.733-5.867 16.555L538.71 462.72v403.69c0 13.889-11.221 25.11-25.109 25.11z" />
          <path d="M667.392 840.747c-6.4 0-12.8-2.646-17.621-7.467a25.13 25.13 0 0 1-7.467-17.621c0-13.867 11.2-25.088 25.088-25.088H861.76a25.067 25.067 0 1 1 0 50.197H667.413zm0-156.971c-13.867 0-25.088-11.221-25.088-25.11 0-13.866 11.2-25.087 25.088-25.087H861.76a25.067 25.067 0 1 1 0 50.197H667.413zm0-155.392a24.747 24.747 0 0 1-24.555-25.643c0-13.866 11.2-24.554 24.555-24.554h193.835a25.067 25.067 0 1 1 0 50.197H667.392z" />
        </svg>
      );
    };
  },
});
