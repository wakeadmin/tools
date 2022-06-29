// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const VipFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgVipFill',
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
        <path d="M713.344 96c38.656 0 74.08 21.568 91.84 55.872l111.232 214.72c18.24 35.2 14.72 77.696-8.96 109.44L594.88 894.784a103.488 103.488 0 0 1-165.824 0L116.544 476.032a103.488 103.488 0 0 1-8.96-109.44l111.2-214.72A103.488 103.488 0 0 1 310.656 96h402.688zM638.24 291.104H357.28a32 32 0 0 0-32 32v4.992a32 32 0 0 0 32 32h280.96a32 32 0 0 0 32-32v-4.992a32 32 0 0 0-32-32z" />
      </svg>
    );
  },
});
