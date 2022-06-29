// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Giftcard = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgGiftcard',
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
        <path d="M728 128c54.72 0 100.736 39.232 103.84 90.464L832 224v252.032l3.776-1.12a96 96 0 0 1 118.176 58.176l1.792 5.344A96 96 0 0 1 960 566.656V832a96 96 0 0 1-96 96H160a96 96 0 0 1-96-96V566.656a96 96 0 0 1 124.224-91.744l3.776 1.12V224c0-52.064 44.16-93.088 98.176-95.84L296 128h432zM160 534.656a32 32 0 0 0-32 32V832a32 32 0 0 0 32 32h704a32 32 0 0 0 32-32V566.656a32 32 0 0 0-41.408-30.592L512 641.472 169.408 536.064a32 32 0 0 0-9.408-1.408zM728 192H296c-21.344 0-37.696 13.248-39.776 28.672L256 224v271.712l255.968 78.784L768 495.712V224c0-15.68-14.912-29.952-35.52-31.808L728 192z" />
      </svg>
    );
  },
});
