// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Qrcode = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgQrcode',
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
        <path d="M272 272h68.576v68.576H272V272zm548.576 548.576h68.576v68.576h-68.576v-68.576zm0-137.152H752V546.272H546.272v342.88h68.576V614.848h68.576V752h205.728V546.272h-68.576v137.152zM683.424 820.576H752v68.576h-68.576v-68.576zM134.848 477.728H477.76v-342.88H134.848V477.76zm68.576-274.304h205.728v205.728H203.424V203.424zm68.576 480h68.576V752H272v-68.576zM134.848 889.152H477.76V546.24H134.848v342.88zm68.576-274.304h205.728v205.728H203.424V614.848zm480-342.848H752v68.576h-68.576V272zM546.272 134.848V477.76h342.88V134.848H546.24zm274.304 274.304H614.848V203.424h205.728v205.728z" />
      </svg>
    );
  },
});
