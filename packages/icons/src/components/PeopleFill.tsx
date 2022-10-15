// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const PeopleFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgPeopleFill',
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
          <path d="M699.744 546.144a187.744 187.744 0 0 1 187.712 187.712V889.6a32 32 0 0 1-32 32H168.544a32 32 0 0 1-32-32V733.856a187.744 187.744 0 0 1 187.712-187.712h375.488zM514.624 102.4a204.8 204.8 0 1 1 0 409.6 204.8 204.8 0 0 1 0-409.6z" />
        </svg>
      );
    };
  },
});
