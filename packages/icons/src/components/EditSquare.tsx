// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const EditSquare = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgEditSquare',
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
        <path d="M832 96H192a96 96 0 0 0-96 96v640a96 96 0 0 0 96 96h640a96 96 0 0 0 96-96V192a96 96 0 0 0-96-96zm-640 64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V192a32 32 0 0 1 32-32zm530.432 151.168a96 96 0 0 0-135.776 0L316.512 581.312a38.4 38.4 0 0 0-10.528 19.616l-17.536 87.712a48 48 0 0 0 56.48 56.48l87.712-17.536a38.4 38.4 0 0 0 19.616-10.496l270.176-270.176a96 96 0 0 0 0-135.744zM679.648 359.2a32 32 0 0 1-2.496 42.464l-264.64 264.64-56.576 11.328 11.296-56.544 264.672-264.672a32 32 0 0 1 45.248 0l2.496 2.784z" />
      </svg>
    );
  },
});
