// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Coupon = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgCoupon',
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
          <path d="M864 160a96 96 0 0 1 96 96v160a32 32 0 0 1-32 32h-32c-33.92 0-61.952 26.496-63.84 59.296L832 512c0 33.92 26.496 61.952 59.296 63.84L896 576h32a32 32 0 0 1 32 32v160a96 96 0 0 1-96 96H160a96 96 0 0 1-96-96V608a32 32 0 0 1 32-32h32c33.92 0 61.952-26.496 63.84-59.296L192 512c0-33.92-26.496-61.952-59.296-63.84L128 448H96a32 32 0 0 1-32-32V256a96 96 0 0 1 96-96zm0 64H160a32 32 0 0 0-32 32v128l7.488.224A128.192 128.192 0 0 1 256 512.928l-.224 6.56A128 128 0 0 1 128 640v128a32 32 0 0 0 28.256 31.776L160 800h704a32 32 0 0 0 32-32V639.968l-7.488-.192A128.192 128.192 0 0 1 768 511.072l.224-6.56A128 128 0 0 1 896 384V256a32 32 0 0 0-32-32zM608 576a32 32 0 0 1 0 64H416a32 32 0 0 1 0-64h192zm0-192a32 32 0 0 1 0 64H416a32 32 0 0 1 0-64h192z" />
        </svg>
      );
    };
  },
});
