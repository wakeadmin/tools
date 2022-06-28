// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const CheckCircleOff = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgCheckCircleOff',
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
          d="M512 938.667C276.352 938.667 85.333 747.648 85.333 512S276.352 85.333 512 85.333 938.667 276.352 938.667 512 747.648 938.667 512 938.667zm0-85.334a341.333 341.333 0 1 0 0-682.666 341.333 341.333 0 0 0 0 682.666z"
          fill="currentColor"
        />
      </svg>
    );
  },
});
