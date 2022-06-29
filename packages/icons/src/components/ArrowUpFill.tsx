// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const ArrowUpFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgArrowUpFill',
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
        <path d="M540.736 285.44 912.48 692.352a33.984 33.984 0 0 1-4.096 50.048 39.36 39.36 0 0 1-24.64 8.544H140.256c-20.896 0-37.824-15.904-37.824-35.52 0-8.448 3.232-16.64 9.12-23.072L483.264 285.44a39.584 39.584 0 0 1 57.472 0z" />
      </svg>
    );
  },
});
