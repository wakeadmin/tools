// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Image = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgImage',
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
        <path
          fill="currentColor"
          d="M132.256 921.6a64 64 0 0 1-64-64V200.544a64 64 0 0 1 64-64h759.488a64 64 0 0 1 64 64V857.6a64 64 0 0 1-33.184 56.096 38.112 38.112 0 0 1-23.296 7.904H132.256zm759.488-721.056H132.256V857.6h156.096l269.184-348.32a64 64 0 0 1 101.312 0l232.864 301.408V200.544zm-283.52 347.84L369.216 857.6h477.856L608.16 548.416zm-318.08-207.04a85.344 85.344 0 1 1 0 170.656 85.344 85.344 0 0 1 0-170.656z"
        />
      </svg>
    );
  },
});
