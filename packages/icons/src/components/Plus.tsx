// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Plus = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgPlus',
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
        <path d="M928.16 552.704H552.704V928.16h-68.256V552.672H108.96V484.48l375.488-.064V108.96h68.256v375.52H928.16z" />
      </svg>
    );
  },
});
