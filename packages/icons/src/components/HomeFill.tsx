// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const HomeFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgHomeFill',
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
        <path d="M460.224 111.168a96 96 0 0 1 103.552 0l320 204.928A96 96 0 0 1 928 396.928V841.92a96 96 0 0 1-96 96H192a96 96 0 0 1-96-96V396.928a96 96 0 0 1 44.224-80.832zM512 596a32 32 0 0 0-32 32v192a32 32 0 1 0 64 0V628a32 32 0 0 0-32-32z" />
      </svg>
    );
  },
});
