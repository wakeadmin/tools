// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Document = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgDocument',
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
          <path d="M673.152 64a64 64 0 0 1 48.864 22.656l158.848 187.712A64 64 0 0 1 896 315.712V864a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zm0 64H224a32 32 0 0 0-32 32v704a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V315.712L673.152 128zM640 576a32 32 0 0 1 0 64H384a32 32 0 0 1 0-64h256zm0-192a32 32 0 0 1 0 64H384a32 32 0 0 1 0-64h256z" />
        </svg>
      );
    };
  },
});
