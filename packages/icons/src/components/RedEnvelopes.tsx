// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const RedEnvelopes = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgRedEnvelopes',
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
          <path d="M800 64a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zM674.24 612.256l-2.304.832A160 160 0 0 1 352 608l.096 5.12c-62.336-21.952-117.216-56.416-160.064-100L192 864a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32l.064-350.944c-42.304 43.04-96.384 77.216-157.824 99.2zM512 512a96 96 0 1 0 0 192 96 96 0 0 0 0-192zm288-384H224a32 32 0 0 0-32 32v247.872l2.688 4.736c35.2 59.808 94.976 108.224 168.512 136.416a160.096 160.096 0 0 1 297.568-.032c75.584-28.928 136.512-79.232 171.296-141.12L832 160a32 32 0 0 0-32-32z" />
        </svg>
      );
    };
  },
});
