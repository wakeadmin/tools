// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const File = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgFile',
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
          d="M593.376 68.256a96 96 0 0 1 67.872 28.128l198.08 198.08a96 96 0 0 1 28.16 67.84v525.152a68.256 68.256 0 0 1-68.288 68.288H204.8a68.256 68.256 0 0 1-68.256-68.288V136.544c0-37.728 30.56-68.288 68.256-68.288h388.576zm-10.976 64H204.8a4.256 4.256 0 0 0-4.064 2.944l-.192 1.344v750.912c0 1.92 1.216 3.52 2.88 4.064l1.376.224h614.4a4.256 4.256 0 0 0 4.064-2.944l.192-1.344V373.312H655.36a72.96 72.96 0 0 1-72.8-67.936l-.16-4.992v-168.16zm201.28 177.056L646.4 172.032v128.32a8.96 8.96 0 0 0 6.912 8.736l2.048.256h128.32z"
        />
      </svg>
    );
  },
});
