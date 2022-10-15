// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Computer = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgComputer',
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
          <path d="M856.64 160A103.36 103.36 0 0 1 960 263.36v379.104a103.36 103.36 0 0 1-103.36 103.36H546.432v71.392h174.784a32 32 0 0 1 32 32v4.928a32 32 0 0 1-32 32H302.784a32 32 0 0 1-32-32v-4.928a32 32 0 0 1 32-32h174.752v-71.392H167.392A103.36 103.36 0 0 1 64.16 648.32l-.16-5.856V263.36A103.36 103.36 0 0 1 167.36 160zm0 68.928H167.36c-19.008 0-34.432 15.424-34.432 34.464v379.072c0 19.04 15.424 34.464 34.464 34.464h689.216c19.04 0 34.464-15.424 34.464-34.464V263.36c0-19.04-15.424-34.464-34.464-34.464z" />
        </svg>
      );
    };
  },
});
