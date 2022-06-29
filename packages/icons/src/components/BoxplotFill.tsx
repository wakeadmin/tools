// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const BoxplotFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgBoxplotFill',
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
        <path d="M96 160a32 32 0 0 1 32 32v288h64V320a64 64 0 0 1 59.2-63.84l4.8-.16h96v512h-96a64 64 0 0 1-63.84-59.2L192 704V544h-64v288a32 32 0 0 1-64 0V192a32 32 0 0 1 32-32zm736 544a64 64 0 0 1-59.2 63.84l-4.8.16H416V256h352a64 64 0 0 1 63.84 59.2l.16 4.8v160h64V192a32 32 0 0 1 64 0v640a32 32 0 0 1-64 0V544h-64v160z" />
      </svg>
    );
  },
});
