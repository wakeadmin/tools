// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Money = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgMoney',
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
        <path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zm0 64C298.016 128 128 298.016 128 507.744c0 209.696 170.016 379.712 379.744 379.712 209.696 0 379.712-170.016 379.712-379.712C887.456 298.016 717.44 128 507.744 128zm159.2 160-99.648 175.36h114.432v38.4H545.792v75.264h135.936v38.4H545.792V736h-67.584V615.424H343.04v-38.4h135.168V501.76H343.04v-38.4h113.664L357.056 288h73.152L512 439.552 593.792 288h73.152z" />
      </svg>
    );
  },
});
