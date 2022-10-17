// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Position = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgPosition',
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
          <path d="M224.128 155.52C380.16 2.656 631.808-.512 791.68 147.68l8.16 7.776a394.176 394.176 0 0 1 0 565.6L512 1002.944 224.128 721.088a394.176 394.176 0 0 1 0-565.6zm516.64 32.448C605.6 69.792 398.144 74.688 268.896 201.216a330.176 330.176 0 0 0 0 474.144L512 913.344 755.104 675.36a330.048 330.048 0 0 0 7.36-466.752l-7.04-7.072-7.52-7.168zM512 275.2a168.544 168.544 0 1 1 0 337.056 168.544 168.544 0 0 1 0-337.056zm0 64a104.544 104.544 0 1 0 0 209.056 104.544 104.544 0 0 0 0-209.056z" />
        </svg>
      );
    };
  },
});
