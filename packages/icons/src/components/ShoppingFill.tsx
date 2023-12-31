// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const ShoppingFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgShoppingFill',
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
          <path d="M416.896 800a64.896 64.896 0 1 1 0 129.792 64.896 64.896 0 0 1 0-129.792zm324.48 0a64.896 64.896 0 1 1 0 129.792 64.896 64.896 0 0 1 0-129.792zM235.68 96a32 32 0 0 1 31.68 27.232l15.392 102.528 547.904.032a97.344 97.344 0 0 1 96.832 107.232l-.64 4.928-44.896 324.48a97.344 97.344 0 0 1-90.496 82.368l-5.728.16H378.816a97.344 97.344 0 0 1-95.168-76.896l-1.088-5.664-2.848-20.096-72.256-481.408h-79.008a32.448 32.448 0 0 1 0-64.896H235.68zm411.936 454.272H516.928a32 32 0 0 0-31.776 28.256l-.224 3.744v.896a32 32 0 0 0 28.256 31.776l3.744.224h130.688a32 32 0 0 0 31.776-28.256l.224-3.744v-.896a32 32 0 0 0-32-32z" />
        </svg>
      );
    };
  },
});
