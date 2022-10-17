// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const SectorFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgSectorFill',
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
          <path d="M489.664 174.176v359.936h359.36v33.184C848.992 784.192 673.28 960 456.48 960S64 784.192 64 567.296c0-209.632 164.448-381.536 372.544-392.16l9.92-.384 43.2-.576zM567.04 64c209.6 0 381.376 164.512 392 372.736l.384 9.92.576 43.2H533.888V64h33.184z" />
        </svg>
      );
    };
  },
});
