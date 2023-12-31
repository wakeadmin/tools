// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Translate = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgTranslate',
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
          <path d="M501.76 96a64 64 0 0 1 64 64v373.76a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V160a64 64 0 0 1 64-64h373.76zm-164.672 71.68h-38.72v61.28H171.52v174.912h37.632V384.16H298.4v119.68h38.72V384.16h89.6v19.712h37.6V228.96H337.088v-61.28zm-38.72 97.856v82.048h-89.184v-82.048h89.248zm128.32 0v82.048h-89.6v-82.048h89.6zM207.36 651.52a35.84 35.84 0 0 1 35.584 31.68l.256 4.16v89.6c0 18.368 13.824 33.536 31.68 35.584l4.16.256h89.6a35.84 35.84 0 0 1 4.16 71.424l-4.16.256h-89.6a107.52 107.52 0 0 1-107.328-101.216l-.192-6.304v-89.6c0-19.808 16.032-35.84 35.84-35.84zM780.8 167.68a107.52 107.52 0 0 1 107.328 101.216l.192 6.304v89.6a35.84 35.84 0 0 1-71.424 4.16l-.256-4.16v-89.6a35.84 35.84 0 0 0-31.68-35.584l-4.16-.256h-89.6a35.84 35.84 0 0 1-4.16-71.424l4.16-.256h89.6z" />
          <path d="M896 418.56a64 64 0 0 1 64 64v373.76a64 64 0 0 1-64 64H522.24a64 64 0 0 1-64-64V633.6h79.36a64 64 0 0 0 63.84-59.2l.16-4.8V418.56H896zM747.104 556.896h-47.68L601.6 812.8h44.8l23.296-64.16h107.168l23.296 64.16h44.8l-97.856-255.904zm-22.944 45.152 40.16 112.192h-82.08l40.512-112.192h1.408z" />
        </svg>
      );
    };
  },
});
