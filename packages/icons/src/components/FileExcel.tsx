// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const FileExcel = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgFileExcel',
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
          fill="#77DE18"
        />
        <path
          d="M426.432 800 512 673.216 597.568 800h59.584L541.12 634.688l108.416-154.56h-59.584L512 595.712l-77.952-115.584h-59.584l107.52 154.56L366.848 800z"
          fill="#FFF"
        />
        <path
          d="M826.88 266.688 693.312 133.12a16 16 0 0 0-27.328 11.296v133.6a16 16 0 0 0 16 16h133.6a16 16 0 0 0 11.296-27.328z"
          fill="#CCF9A2"
        />
      </svg>
    );
  },
});
