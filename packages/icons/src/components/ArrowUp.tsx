// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ArrowUp = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgArrowUp',
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
        <path
          fill="currentColor"
          d="m916.48 711.392-370.56-389.76a47.104 47.104 0 0 0-64.256-3.392l-3.552 3.392L107.52 711.36a3.2 3.2 0 0 0 2.304 5.408h86.4a6.4 6.4 0 0 0 4.608-1.984L512 387.616l311.136 327.2a6.4 6.4 0 0 0 4.64 1.984h86.4a3.2 3.2 0 0 0 2.304-5.408z"
        />
      </svg>
    );
  },
});
