// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ShareSquare = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgShareSquare',
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
        <path d="M608 104.32a32 32 0 0 1 3.744 63.776l-3.744.224H197.824c-19.584 0-35.68 14.88-37.632 33.92l-.192 3.936v628.352c0 19.584 14.88 35.68 33.952 37.632l3.84.192h628.384c19.584 0 35.68-14.88 37.632-33.952l.192-3.84V424.32a32 32 0 0 1 63.776-3.712l.224 3.744v410.176a101.824 101.824 0 0 1-96.032 101.664l-5.76.16H197.792A101.824 101.824 0 0 1 96.128 840.32L96 834.528V206.112a101.824 101.824 0 0 1 96.032-101.664l5.76-.16H608zm136.48-4.768 3.424 2.08 155.808 107.136a48 48 0 0 1-22.592 87.36l-4.608.192H704a96 96 0 0 0-95.84 90.368l-.16 5.632v256a32 32 0 0 1-63.776 3.744L544 648.32v-256a160 160 0 0 1 153.056-159.84l6.944-.16 120.992-.032-113.344-77.92a32 32 0 0 1-10.304-41.056l2.08-3.456a32 32 0 0 1 41.056-10.304z" />
      </svg>
    );
  },
});
