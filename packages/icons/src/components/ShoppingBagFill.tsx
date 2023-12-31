// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const ShoppingBagFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgShoppingBagFill',
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
          <path d="M800 64a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zM672 256a32 32 0 0 0-32 32v26.656l-.16 6.4a128 128 0 0 1-255.84-6.4V288l-.224-3.744A32 32 0 0 0 320 288v26.656l.128 7.2a192 192 0 0 0 383.872-7.2V288l-.224-3.744A32 32 0 0 0 672 256z" />
        </svg>
      );
    };
  },
});
