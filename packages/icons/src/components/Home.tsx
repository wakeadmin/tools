// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Home = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgHome',
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
        <path d="M460.224 111.168a96 96 0 0 1 103.552 0l320 204.928A96 96 0 0 1 928 396.928V841.92a96 96 0 0 1-96 96H192a96 96 0 0 1-96-96V396.928a96 96 0 0 1 44.224-80.832zm69.024 53.888a32 32 0 0 0-34.496 0l-320 204.928A32 32 0 0 0 160 396.928V841.92a32 32 0 0 0 32 32h640a32 32 0 0 0 32-32V396.928a32 32 0 0 0-14.72-26.944zM512 596a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V628a32 32 0 0 1 32-32z" />
      </svg>
    );
  },
});
