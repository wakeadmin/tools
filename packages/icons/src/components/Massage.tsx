// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Massage = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgMassage',
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
          <path d="M891.744 136.544a64 64 0 0 1 64 64v622.912a64 64 0 0 1-64 64H132.256a64 64 0 0 1-64-64V200.544a64 64 0 0 1 64-64h759.488zm0 251.776L512 545.376 132.224 388.32l.032 435.136h759.488V388.32zm0-187.776H132.256V319.04L512 476.128l379.712-157.12V200.576z" />
        </svg>
      );
    };
  },
});
