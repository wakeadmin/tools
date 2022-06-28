// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const FileVideo = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgFileVideo',
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
          d="M886.592 288.704A31.817 31.817 0 0 1 896 311.296V928c0 17.696-14.304 32-32 32H160c-17.696 0-32-14.304-32-32V96c0-17.696 14.304-32 32-32h488.704a32.169 32.169 0 0 1 22.72 9.408l215.168 215.296z"
          fill="#1B99FF"
        />
        <path
          d="M826.88 266.688 693.312 133.12a16 16 0 0 0-27.328 11.296v133.6a16 16 0 0 0 16 16h133.6a16 16 0 0 0 11.296-27.328z"
          fill="#88CAFF"
        />
        <path
          d="M417.28 443.776a189.536 189.536 0 1 1 189.568 328.288 189.536 189.536 0 0 1-189.536-328.32zM460.544 512a.576.576 0 0 0-.288.512v190.72c0 .448.512.736.896.512l165.152-95.36a.576.576 0 0 0 0-1.024L461.152 512a.576.576 0 0 0-.608 0z"
          fill="#FFF"
        />
      </svg>
    );
  },
});
