// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Boxplot = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgBoxplot',
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
        <path d="M928 160a32 32 0 0 1 32 32v640a32 32 0 0 1-64 0V544h-64v160a64 64 0 0 1-59.2 63.84l-4.8.16H256a64 64 0 0 1-64-64V544h-64v288a32 32 0 0 1-64 0V192a32 32 0 1 1 64 0v288h64V320a64 64 0 0 1 59.2-63.84l4.8-.16h512a64 64 0 0 1 64 64v160h64V192a32 32 0 0 1 32-32zM352 320h-96v384h96V320zm416 0H416v384h352V320z" />
      </svg>
    );
  },
});
