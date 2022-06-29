// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Brand = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgBrand',
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
        <path d="M775.456 821.408a32 32 0 0 1 0 64h-512a32 32 0 1 1 0-64h512zm-298.24-645.472a64 64 0 0 1 84.48 0l165.76 145.696 109.184-96a64 64 0 0 1 104.288 63.904L840.096 685.12a96 96 0 0 1-93.024 72.288H291.84a96 96 0 0 1-93.056-72.32L98.016 289.568a64 64 0 0 1 104.224-63.904l109.184 96zM519.456 224l-165.76 145.696a64 64 0 0 1-84.48 0l-109.216-96 100.864 395.616a32 32 0 0 0 31.008 24.096h455.2a32 32 0 0 0 31.008-24.096l100.8-395.584-109.152 96a64 64 0 0 1-84.512 0L519.456 224z" />
      </svg>
    );
  },
});
