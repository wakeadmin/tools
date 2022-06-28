// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const MapPin = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgMapPin',
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
          d="M783.53 740.864 512 1012.394l-271.53-271.53a384 384 0 1 1 543.06 0zM512 554.667A85.333 85.333 0 1 0 512 384a85.333 85.333 0 0 0 0 170.667z"
          fill="currentColor"
        />
      </svg>
    );
  },
});
