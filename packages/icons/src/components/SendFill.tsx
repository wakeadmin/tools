// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const SendFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgSendFill',
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
        <path d="M925.888 110.848a33.619 33.619 0 0 1 0 23.456L641.92 898.944a33.696 33.696 0 0 1-55.392 12.096L412.512 737.024 292.256 849.472C269.28 870.912 232.8 852 235.68 821.984l.512-3.648 37.856-191.904a33.921 33.921 0 0 1 7.712-15.712l2.208-2.24-178.08-178.08a33.696 33.696 0 0 1 12.096-55.36l764.64-284.032a33.696 33.696 0 0 1 43.296 19.84zM738.24 267.968 325.568 578.56l45.056 48.96L738.24 268z" />
      </svg>
    );
  },
});
