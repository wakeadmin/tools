// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Video = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgVideo',
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
          <path d="M898.24 261.216 735.968 361.792l.672 291.328 160.832 99.712a38.4 38.4 0 0 0 58.496-32.736V294.4a38.4 38.4 0 0 0-57.76-33.184zm-6.304 79.168V674.08l-91.392-56.672L800 397.344l91.936-56.96zM736 160a64 64 0 0 1 64 64v576a64 64 0 0 1-64 64H160a64 64 0 0 1-64-64V224a64 64 0 0 1 64-64h576zm0 64H160v576h576V224zm-480 64h128q32 0 32 32t-32 32H256q-32 0-32-32t32-32Z" />
        </svg>
      );
    };
  },
});
