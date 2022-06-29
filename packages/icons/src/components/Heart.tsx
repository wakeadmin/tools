// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Heart = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgHeart',
  inheritAttrs: true,
  render() {
    let fallthroughProps: any;

    if (isVue2) {
      fallthroughProps = {
        // @ts-expect-error
        on: this.$listeners,
      };
    }
    return (
      <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
        <path d="M512 938.667 119.808 546.475c-93.013-109.568-88.15-273.92 15.061-377.174A277.333 277.333 0 0 1 512 155.307a277.333 277.333 0 0 1 391.637 390.57L512 938.667zm326.912-448.384a192 192 0 0 0-271.147-270.379L512 268.032l-55.765-48.128a192 192 0 0 0-271.147 270.379l4.864 5.632L512 818.005l322.048-322.09 4.864-5.632z" />
      </svg>
    );
  },
});
