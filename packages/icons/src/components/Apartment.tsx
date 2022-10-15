// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Apartment = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgApartment',
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
          <path d="M448 416a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h128a96 96 0 0 1 96 96v128a96 96 0 0 1-96 96h-32v64h192a64 64 0 0 1 63.84 59.2l.16 4.8v64h32a96 96 0 0 1 95.84 90.368L928 704v128a96 96 0 0 1-90.368 95.84L832 928H704a96 96 0 0 1-95.84-90.368L608 832V704a96 96 0 0 1 90.368-95.84L704 608h32v-64H288v64h32a96 96 0 0 1 95.84 90.368L416 704v128a96 96 0 0 1-90.368 95.84L320 928H192a96 96 0 0 1-95.84-90.368L96 832V704a96 96 0 0 1 90.368-95.84L192 608h32v-64a64 64 0 0 1 59.2-63.84l4.8-.16h192v-64zm384 256H704a32 32 0 0 0-31.776 28.256L672 704v128a32 32 0 0 0 28.256 31.776L704 864h128a32 32 0 0 0 31.776-28.256L864 832V704a32 32 0 0 0-32-32zm-512 0H192a32 32 0 0 0-31.776 28.256L160 704v128a32 32 0 0 0 28.256 31.776L192 864h128a32 32 0 0 0 31.776-28.256L352 832V704a32 32 0 0 0-32-32zm256-512H448a32 32 0 0 0-32 32v128a32 32 0 0 0 32 32h128a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32z" />
        </svg>
      );
    };
  },
});
