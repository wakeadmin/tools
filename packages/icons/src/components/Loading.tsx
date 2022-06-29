// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Loading = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgLoading',
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
        <path d="M512 128a384 384 0 0 1 384 384h-85.333A298.667 298.667 0 0 0 512 213.333V128z" />
      </svg>
    );
  },
});
