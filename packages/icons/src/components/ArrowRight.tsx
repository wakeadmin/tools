// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ArrowRight = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgArrowRight',
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
        <path d="m562.005 512-211.2-211.2 60.331-60.33L682.666 512l-271.53 271.53-60.33-60.33z" fill="currentColor" />
      </svg>
    );
  },
});
