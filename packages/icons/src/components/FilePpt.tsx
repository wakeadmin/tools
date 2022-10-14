// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const FilePpt = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgFilePpt',
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
            fill="#FF8929"
          />
          <path
            d="M446.144 800V675.456h82.88c76.608 0 115.136-32.704 115.136-98.112 0-64.96-38.08-97.216-114.24-97.216H397.312V800h48.832zm79.744-166.208h-79.744v-112h79.744c23.744 0 41.216 4.48 52.416 13.44 11.2 8.064 17.024 22.4 17.024 42.112 0 19.712-5.824 34.048-16.576 43.008-11.2 8.96-28.672 13.44-52.864 13.44z"
            fill="#FFF"
          />
          <path
            d="M826.88 266.688 693.312 133.12a16 16 0 0 0-27.328 11.296v133.6a16 16 0 0 0 16 16h133.6a16 16 0 0 0 11.296-27.328z"
            fill="#FFE4CE"
          />
        </svg>
      );
    };
  },
});
