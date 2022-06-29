// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const MessageFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgMessageFill',
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
        <path d="M891.744 136.544a64 64 0 0 1 64 64v622.912a64 64 0 0 1-64 64H132.256a64 64 0 0 1-64-64V200.544a64 64 0 0 1 64-64h759.488zm63.904 175.232L512 476.128 68.32 311.776v59.136L512 545.376l443.648-174.464v-59.136z" />
      </svg>
    );
  },
});
