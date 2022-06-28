// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const More = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgMore',
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
          d="M204.8 443.744a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512zm307.2 0a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512zm307.2 0a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512z"
        />
      </svg>
    );
  },
});
