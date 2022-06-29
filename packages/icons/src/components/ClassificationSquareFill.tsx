// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ClassificationSquareFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgClassificationSquareFill',
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
        <path d="M448 544a32 32 0 0 1 32 32v288a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V576a32 32 0 0 1 32-32h288zm416 0a32 32 0 0 1 32 32v288a32 32 0 0 1-32 32H576a32 32 0 0 1-32-32V576a32 32 0 0 1 32-32h288zM448 128a32 32 0 0 1 32 32v288a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h288zm416 0a32 32 0 0 1 32 32v288a32 32 0 0 1-32 32H576a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h288z" />
      </svg>
    );
  },
});
