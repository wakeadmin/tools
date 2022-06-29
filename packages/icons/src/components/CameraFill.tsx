// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const CameraFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgCameraFill',
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
        <path d="M648.544 102.4c18.848 0 34.112 15.296 34.112 34.144L716.8 204.8h170.656c37.728 0 68.288 30.56 68.288 68.256V819.2a68.256 68.256 0 0 1-68.288 68.256H136.544A68.256 68.256 0 0 1 68.256 819.2V273.056c0-37.696 30.56-68.256 68.288-68.256H307.2l34.144-68.256c0-18.88 15.264-34.144 34.112-34.144h273.088zM512 375.456a170.656 170.656 0 1 0 0 341.344 170.656 170.656 0 0 0 0-341.344zm0 64a106.656 106.656 0 1 1 0 213.344 106.656 106.656 0 0 1 0-213.344z" />
      </svg>
    );
  },
});
