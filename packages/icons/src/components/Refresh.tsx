// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Refresh = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgRefresh',
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
          <path d="m136.544 443.744-102.4 136.512h76.064c32.48 192.544 200 339.2 401.792 339.2 140.064 0 268-71.232 342.56-186.752a32 32 0 0 0-53.76-34.688A343.104 343.104 0 0 1 512 855.456c-166.304 0-305.024-118.208-336.672-275.2h63.616l-102.4-136.512zM512 104.544c-145.664 0-278.016 77.12-350.848 200.16a32 32 0 0 0 55.04 32.608A343.232 343.232 0 0 1 512 168.544c178.176 0 324.64 135.648 341.76 309.312h-68.704l102.4 136.544 102.4-136.544H918.08C900.704 268.8 725.536 104.544 512 104.544z" />
        </svg>
      );
    };
  },
});
