// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const WorkcardFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgWorkcardFill',
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
          <path d="M800 64a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zM672 576H352a32 32 0 0 0 0 64h320a32 32 0 0 0 0-64zM512 224a160 160 0 1 0 0 320 160 160 0 0 0 0-320zm0 64a96 96 0 1 1 0 192 96 96 0 0 1 0-192z" />
        </svg>
      );
    };
  },
});
