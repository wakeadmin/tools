// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Save = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgSave',
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
          d="M640.384 102.4a102.4 102.4 0 0 1 72.8 30.4L892 313.504a102.4 102.4 0 0 1 29.6 72.032V857.6a64 64 0 0 1-64 64H166.4a64 64 0 0 1-64-64V166.4a64 64 0 0 1 64-64h473.984zm8.128 511.968H375.456V857.6h273.056V614.368zM640.384 166.4H166.4v691.2h140.8V578.144a32 32 0 0 1 32-32h345.6a32 32 0 0 1 32 32v4.256l-.032.512V857.6H857.6V385.536a38.4 38.4 0 0 0-8.256-23.776l-2.848-3.232L667.68 177.792a38.4 38.4 0 0 0-27.296-11.392zM377.6 288c3.52 0 6.4 2.88 6.4 6.4v51.2a6.4 6.4 0 0 1-6.4 6.4H262.4a6.4 6.4 0 0 1-6.4-6.4v-51.2c0-3.52 2.88-6.4 6.4-6.4h115.2z"
        />
      </svg>
    );
  },
});
