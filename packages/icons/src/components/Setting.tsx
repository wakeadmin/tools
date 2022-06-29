// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Setting = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgSetting',
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
        <path d="m512 42.667 405.333 234.666v469.334L512 981.333 106.667 746.667V277.333L512 42.667zm0 98.602L192 326.528v370.944l320 185.259 320-185.259V326.528L512 141.269zm0 541.398a170.667 170.667 0 1 1 0-341.334 170.667 170.667 0 0 1 0 341.334zm0-85.334a85.333 85.333 0 1 0 0-170.666 85.333 85.333 0 0 0 0 170.666z" />
      </svg>
    );
  },
});
