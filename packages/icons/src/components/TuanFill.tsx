// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const TuanFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgTuanFill',
  inheritAttrs: true,
  render() {
    let fallthroughProps: any;

    if (isVue2) {
      fallthroughProps = {
        // @ts-expect-error
        on: this.$listeners,
      };
    }
    return (
      <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
        <path d="M464 54.752a96 96 0 0 1 96 0L880 239.52a96 96 0 0 1 48 83.136V692.16a96 96 0 0 1-48 83.136L560 960.032a96 96 0 0 1-96 0L144 775.296a96 96 0 0 1-48-83.136V322.656a96 96 0 0 1 48-83.136zM704 297.92H320v409.728h45.92v-16.064h292.16v16.064H704V297.92zm-45.92 43.2v307.296H365.92V341.12h292.16zm-72.128 16.96H540.48v49.632H391.2v42.72h116.672c-31.232 43.2-73.024 77.632-125.408 103.36l25.728 42.72A396.032 396.032 0 0 0 540.48 464.224v102.4c0 11.968-5.056 18.4-14.72 18.4-15.584 0-31.2-1.376-47.744-3.2l10.112 44.064h53.28c29.376 0 44.544-16.064 44.544-47.296v-128.16h51.904V407.68h-51.904v-49.6z" />
      </svg>
    );
  },
});
