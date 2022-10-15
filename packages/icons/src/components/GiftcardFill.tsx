// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const GiftcardFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgGiftcardFill',
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
          <path d="M832 608v32H192v-32h640zM192 192a64 64 0 0 1 64-64h512a64 64 0 0 1 64 64v229.44l-320.032 98.432L192 421.44V192zm643.776 292.256-323.808 99.616-323.744-99.616A96 96 0 0 0 64 576.032v265.344a96 96 0 0 0 96 96h704a96 96 0 0 0 96-96V576a96 96 0 0 0-124.224-91.776z" />
        </svg>
      );
    };
  },
});
