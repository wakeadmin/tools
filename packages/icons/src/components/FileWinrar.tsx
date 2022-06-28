// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const FileWinrar = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgFileWinrar',
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
        <path d="M64 896V128h800v768z" fill="#1B99FF" />
        <path d="M416 896V128h224v768z" fill="#F65F5D" />
        <path d="M640 896V128h288a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32H640z" fill="#7ECF3C" />
        <path d="M64 608V416h896v192z" fill="#FFB038" />
        <path d="M416 640V384h224v256z" fill="#FFF" />
        <path d="M448 608V416h160v192z" fill="#FFB038" />
      </svg>
    );
  },
});
