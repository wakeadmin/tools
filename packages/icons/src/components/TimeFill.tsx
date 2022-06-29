// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const TimeFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgTimeFill',
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
        <path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zm-28 258.464a32.32 32.32 0 0 0-32.32 32.32v193.824c0 17.856 14.464 32.32 32.32 32.32h258.464a32.32 32.32 0 0 0 0-64.64H516.32V354.784a32.32 32.32 0 0 0-32.32-32.32z" />
      </svg>
    );
  },
});
