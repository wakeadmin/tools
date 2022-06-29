// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Bookmark = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgBookmark',
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
        <path d="M213.333 85.333h597.334A42.667 42.667 0 0 1 853.333 128v816.768a21.333 21.333 0 0 1-32.682 18.09L512 769.28 203.35 962.816a21.333 21.333 0 0 1-32.683-18.048V128a42.667 42.667 0 0 1 42.666-42.667z" />
      </svg>
    );
  },
});
