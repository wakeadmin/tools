// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Check = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgCheck',
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
        <path d="M427.904 794.56a6.4 6.4 0 0 1-9.056 0l-288.96-289.024a6.4 6.4 0 0 1 0-9.056l36.16-36.16a6.4 6.4 0 0 1 9.088 0L423.36 708.544 875.936 256l45.248 45.248-493.28 493.312z" />
      </svg>
    );
  },
});
