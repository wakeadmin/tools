// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Radarchart = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgRadarchart',
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
          <path d="M455.616 146.304a95.968 95.968 0 0 1 112.768 0l320.064 232.352a95.776 95.776 0 0 1 34.88 107.136l-122.304 376a95.904 95.904 0 0 1-91.2 66.208H314.176a95.904 95.904 0 0 1-91.2-66.24L100.704 485.824a95.776 95.776 0 0 1 34.848-107.136zM613.312 753.76l-4.16.192H415.456l-80.16 110.144h361.216l-83.2-110.336zM172.576 500.096l107.616 331.04 78.688-108.192a68.608 68.608 0 0 1-6.144-11.616l-1.792-4.928-59.584-183.168v-.064l-118.784-23.072zm678.816 0-117.088 22.72-.096.416L674.624 706.4c-1.6 4.992-3.776 9.696-6.4 14.08l77.92 103.296 105.248-323.68zM512.608 620.224l-47.2 64.928h96.16l-48.96-64.928zm-144.032-82.08 38.528 118.464 70.72-97.248-109.248-21.216zm288.48-.32-110.4 21.44 3.968 5.248 1.632 1.216-.352.448 67.04 88.896 38.112-117.248zM480 412.544l-89.28 64.832L480 494.72v-82.176zm63.968-1.12v83.296l90.528-17.568-90.528-65.728zM480 207.552 173.12 430.368a32 32 0 0 0-4.448 3.872l133.504 25.92a68.566 68.566 0 0 1 14.208-13.824L472.32 333.12a64.05 64.05 0 0 1 7.68-4.8v-120.8zm63.968 0v119.904a71.256 71.256 0 0 1 9.28 5.664l155.936 113.216a69.68 69.68 0 0 1 14.016 13.568l132.128-25.664a32 32 0 0 0-4.448-3.872L543.968 207.552z" />
        </svg>
      );
    };
  },
});
