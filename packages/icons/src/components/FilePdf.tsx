// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const FilePdf = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgFilePdf',
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
          <path
            d="M886.592 288.704A31.817 31.817 0 0 1 896 311.296V928c0 17.696-14.304 32-32 32H160c-17.696 0-32-14.304-32-32V96c0-17.696 14.304-32 32-32h488.704a32.169 32.169 0 0 1 22.72 9.408l215.168 215.296z"
            fill="#FF4918"
          />
          <path
            d="M257.28 736v-88.96h59.2c54.72 0 82.24-23.36 82.24-70.08 0-46.4-27.2-69.44-81.6-69.44H222.4V736h34.88zm56.96-118.72h-56.96v-80h56.96c16.96 0 29.44 3.2 37.44 9.6 8 5.76 12.16 16 12.16 30.08 0 14.08-4.16 24.32-11.84 30.72-8 6.4-20.48 9.6-37.76 9.6zM513.6 736c36.8 0 64.64-10.24 83.84-30.72 18.24-19.84 27.52-47.68 27.52-83.52 0-36.16-8.96-64-26.88-83.2-19.2-20.8-47.04-31.04-83.84-31.04h-83.2V736h82.56zm-6.4-29.76h-41.28V537.28h41.92c28.8 0 49.92 6.72 63.36 20.48 12.8 13.44 19.52 34.56 19.52 64 0 28.8-6.72 49.92-19.84 63.68-13.44 13.76-34.88 20.8-63.68 20.8zM695.36 736V633.6h113.6v-29.76h-113.6v-66.56h120.32v-29.76h-155.2V736h34.88z"
            fill="#FFF"
          />
          <path
            d="M826.88 266.688 693.312 133.12a16 16 0 0 0-27.328 11.296v133.6a16 16 0 0 0 16 16h133.6a16 16 0 0 0 11.296-27.328z"
            fill="#FFBFAE"
          />
        </svg>
      );
    };
  },
});
