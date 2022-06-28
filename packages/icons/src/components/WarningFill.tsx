// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const WarningFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgWarningFill',
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
          d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zm2.464 585.856h-4.928a32 32 0 0 0-32 32v4.928a32 32 0 0 0 32 32h4.928a32 32 0 0 0 32-32v-4.928a32 32 0 0 0-32-32zm0-344.64h-4.928a32 32 0 0 0-32 32v246.176a32 32 0 0 0 32 32h4.928a32 32 0 0 0 32-32V337.216a32 32 0 0 0-32-32z"
        />
      </svg>
    );
  },
});
