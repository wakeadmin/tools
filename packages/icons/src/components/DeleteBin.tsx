// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const DeleteBin = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgDeleteBin',
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
          <path d="M725.333 256h213.334v85.333h-85.334V896a42.667 42.667 0 0 1-42.666 42.667H213.333A42.667 42.667 0 0 1 170.667 896V341.333H85.333V256h213.334V128a42.667 42.667 0 0 1 42.666-42.667h341.334A42.667 42.667 0 0 1 725.333 128v128zM768 341.333H256v512h512v-512zM384 170.667V256h256v-85.333H384z" />
        </svg>
      );
    };
  },
});
