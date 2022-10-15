// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const SortFill = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgSortFill',
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
          <path d="M804.571 621.714q0 14.857-10.857 25.715l-256 256Q526.857 914.286 512 914.286t-25.714-10.857l-256-256q-10.857-10.858-10.857-25.715T230.286 596 256 585.143h512q14.857 0 25.714 10.857t10.857 25.714zm0-219.428q0 14.857-10.857 25.714T768 438.857H256q-14.857 0-25.714-10.857t-10.857-25.714 10.857-25.715l256-256q10.857-10.857 25.714-10.857t25.714 10.857l256 256q10.857 10.858 10.857 25.715z" />
        </svg>
      );
    };
  },
});
