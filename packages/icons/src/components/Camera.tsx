// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Camera = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgCamera',
  inheritAttrs: true,
  setup() {
    const vm = getCurrentInstance()?.proxy;
    return () => {
      let fallthroughProps: any;

      if (isVue2) {
        fallthroughProps = {
          // @ts-ignore
          on: vm?.$listeners,
        };
      }
      return (
        <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
          <path d="M648.544 102.4c18.848 0 34.112 15.296 34.112 34.144L716.8 204.8h170.656c37.728 0 68.288 30.56 68.288 68.256V819.2a68.256 68.256 0 0 1-68.288 68.256H136.544A68.256 68.256 0 0 1 68.256 819.2V273.056c0-37.696 30.56-68.256 68.288-68.256H307.2l34.144-68.256c0-18.88 15.264-34.144 34.112-34.144h273.088zm-22.528 64H397.92l-51.168 102.4h-210.24a4.256 4.256 0 0 0-4.032 2.912l-.224 1.344V819.2c0 1.888 1.248 3.488 2.944 4.064l1.344.192h750.912a4.256 4.256 0 0 0 4.064-2.88l.224-1.376V273.056a4.256 4.256 0 0 0-2.944-4.032l-1.344-.224h-210.24l-51.2-102.4zM512 375.456a170.656 170.656 0 1 1 0 341.344 170.656 170.656 0 0 1 0-341.344zm0 64a106.656 106.656 0 1 0 0 213.344 106.656 106.656 0 0 0 0-213.344z" />
        </svg>
      );
    };
  },
});
