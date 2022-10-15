// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Bargain = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgBargain',
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
          <path d="M97.28 218.112a96 96 0 0 1 89.152-82.752l6.208-.192 255.136.832c25.536.096 49.92 10.336 66.816 27.296l4.064 4.352L654.272 306.56l-45.792 44.704-136.864-140.256a32 32 0 0 0-20.16-10.752l-3.904-.256-255.104-.832a32 32 0 0 0-31.04 23.776l-.768 3.872-34.688 252.768a32 32 0 0 0 5.152 22.208l2.4 3.136 159.392 183.36-48.32 41.984-159.36-183.36a96 96 0 0 1-23.328-69.696l.64-6.336L97.28 218.112zm724.704-13.376L311.68 862.656l-49.024-41.12zm34.4 134.688 122.24 126.592a96 96 0 0 1 1.6 131.712l-3.936 4.032-276.224 266.752a96 96 0 0 1-131.68 1.6l-4.032-3.936L463.52 762.048l45.984-44.512 100.832 104.16a32 32 0 0 0 42.432 3.2l2.816-2.4 276.224-266.752a32 32 0 0 0 3.232-42.432l-2.432-2.816-122.24-126.624 46.016-44.448zM229.972 336.714a64 64 0 1 0 127.512-11.156 64 64 0 1 0-127.512 11.156Z" />
        </svg>
      );
    };
  },
});
