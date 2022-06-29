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
        <path d="M640 128h256v213.333h-85.333v-128H640V128zm-256 0v85.333H213.333v128H128V128h256zm256 768v-85.333h170.667v-128H896V896H640zm-256 0H128V682.667h85.333v128H384V896zM128 469.333h768v85.334H128v-85.334z" />
      </svg>
    );
  },
});
