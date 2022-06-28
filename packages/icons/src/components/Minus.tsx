// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Minus = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgMinus',
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
        <path fill="currentColor" d="M102.4 477.856h819.2v68.256H102.4z" />
      </svg>
    );
  },
});
