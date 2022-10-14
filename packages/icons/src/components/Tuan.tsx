// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Tuan = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgTuan',
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
          <path d="M464 54.752 144 239.52a96 96 0 0 0-48 83.136V692.16a96 96 0 0 0 48 83.136l320 184.736a96 96 0 0 0 96 0l320-184.736a96 96 0 0 0 48-83.136V322.656a96 96 0 0 0-48-83.136L560 54.752a96 96 0 0 0-96 0zm64 55.424 320 184.768a32 32 0 0 1 16 27.712V692.16a32 32 0 0 1-16 27.712L528 904.608a32 32 0 0 1-32 0L176 719.872a32 32 0 0 1-16-27.712V322.656a32 32 0 0 1 16-27.712l320-184.768a32 32 0 0 1 32 0zM391.2 407.68v42.72h116.672c-31.232 43.2-73.024 77.632-125.408 103.36l25.728 42.72A396.032 396.032 0 0 0 540.48 464.192v102.4c0 11.968-5.056 18.4-14.72 18.4-15.584 0-31.2-1.376-47.744-3.2l10.112 44.064h53.28c29.376 0 44.544-16.064 44.544-47.296V450.4h51.904v-42.72h-51.904v-49.6H540.48v49.6H391.2zM704 297.92H320v409.696h45.92v-16.064h292.16v16.064H704V297.92zM365.92 648.352V341.056h292.16v307.296H365.92z" />
        </svg>
      );
    };
  },
});
