// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Gift = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgGift',
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
          <path d="M615.36 96a137.856 137.856 0 0 1 137.696 130.976l.16 6.88h103.392a103.36 103.36 0 0 1 34.496 200.864v384.96A103.36 103.36 0 0 1 787.68 923.072H236.32a103.36 103.36 0 0 1-103.392-103.36v-384.96a103.424 103.424 0 0 1 34.432-200.928h103.36a137.856 137.856 0 0 1 237.568-95.2L512 142.72l3.68-4.032a137.44 137.44 0 0 1 92.8-42.496l6.944-.192zm206.784 344.64H201.856v379.04c0 17.696 13.28 32.256 30.432 34.24l4.032.224h551.36c19.04 0 34.464-15.424 34.464-34.464V440.64zm34.464-137.856H167.392a34.464 34.464 0 1 0 0 68.896h689.216a34.464 34.464 0 0 0 0-68.896zM684.32 233.856a68.928 68.928 0 0 0-137.664-5.152l-.192 5.12H684.32zm-275.712-68.928a68.928 68.928 0 0 0-68.736 63.776l-.192 5.12h137.856c0-38.048-30.848-68.896-68.928-68.896z" />
        </svg>
      );
    };
  },
});
