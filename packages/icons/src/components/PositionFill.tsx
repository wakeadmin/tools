// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const PositionFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgPositionFill',
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
          <path d="M224.128 155.52C380.16 2.656 631.808-.512 791.68 147.68l8.16 7.776a394.176 394.176 0 0 1 0 565.6L512 1002.944 224.128 721.088a394.176 394.176 0 0 1 0-565.6zM512 275.2a168.544 168.544 0 1 0 0 337.056 168.544 168.544 0 0 0 0-337.056zm0 64a104.544 104.544 0 1 1 0 209.056 104.544 104.544 0 0 1 0-209.056z" />
        </svg>
      );
    };
  },
});
