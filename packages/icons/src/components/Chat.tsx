// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Chat = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgChat',
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
          <path d="m311.083 888.49-225.75 50.177 50.176-225.75A424.79 424.79 0 0 1 85.333 512C85.333 276.352 276.352 85.333 512 85.333S938.667 276.352 938.667 512 747.648 938.667 512 938.667a424.79 424.79 0 0 1-200.917-50.176zm12.373-90.154 27.861 14.933A339.413 339.413 0 0 0 512 853.333 341.333 341.333 0 1 0 170.667 512c0 56.917 13.866 111.701 40.106 160.683l14.891 27.861-27.947 125.739 125.739-27.947z" />
        </svg>
      );
    };
  },
});
