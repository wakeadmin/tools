// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const FileMusic = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgFileMusic',
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
            fill="#25D231"
          />
          <path
            d="M826.88 266.688 693.312 133.12a16 16 0 0 0-27.328 11.296v133.6a16 16 0 0 0 16 16h133.6a16 16 0 0 0 11.296-27.328z"
            fill="#A6E6AB"
          />
          <path
            d="m625.6 412.288-211.68 35.36a9.728 9.728 0 0 0-1.92.544h-7.68a9.28 9.28 0 0 0-9.344 9.28v241.984a56.128 56.128 0 0 0-84.288 48.576c0 30.944 25.152 56.032 56.192 56.032a56.128 56.128 0 0 0 55.808-62.72 9.408 9.408 0 0 0 .384-2.72v-196.8l196.672-34.656V643.36a56.128 56.128 0 0 0-84.288 48.576c0 30.944 25.152 56.064 56.192 56.064a56.128 56.128 0 0 0 55.776-62.72 9.408 9.408 0 0 0 .416-2.72V420.928a9.312 9.312 0 0 0-7.68-9.152 7.936 7.936 0 0 0-5.6-.992l-4.96.832h-.512a9.664 9.664 0 0 0-3.52.64z"
            fill="#FFF"
          />
        </svg>
      );
    };
  },
});
