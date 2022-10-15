// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Verify = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgVerify',
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
          <path d="M896 672a32 32 0 0 1 31.776 28.256L928 704v128a96 96 0 0 1-90.368 95.84L832 928H704a32 32 0 0 1-3.744-63.776L704 864h128a32 32 0 0 0 31.776-28.256L864 832V704a32 32 0 0 1 32-32zm-768 0a32 32 0 0 1 31.776 28.256L160 704v128a32 32 0 0 0 28.256 31.776L192 864h128a32 32 0 0 1 3.744 63.776L320 928H192a96 96 0 0 1-95.84-90.368L96 832V704a32 32 0 0 1 32-32zM832 96a96 96 0 0 1 95.84 90.368L928 192v128a32 32 0 0 1-63.776 3.744L864 320V192a32 32 0 0 0-28.256-31.776L832 160H704a32 32 0 0 1-3.744-63.776L704 96h128zm-512 0a32 32 0 0 1 3.744 63.776L320 160H192a32 32 0 0 0-31.776 28.256L160 192v128a32 32 0 0 1-63.776 3.744L96 320V192a96 96 0 0 1 90.368-95.84L192 96h128zm38.4 270.72h-32a6.4 6.4 0 0 1-6.4-6.4V326.4c0-3.52 2.88-6.4 6.4-6.4H448c3.52 0 6.4 2.88 6.4 6.4v180.64l177.28-185.056a6.4 6.4 0 0 1 4.608-1.984h116.704a6.4 6.4 0 0 1 4.64 10.816L375.808 729.28a6.4 6.4 0 0 1-11.04-4.448v-351.68a6.4 6.4 0 0 0-6.4-6.4z" />
        </svg>
      );
    };
  },
});
