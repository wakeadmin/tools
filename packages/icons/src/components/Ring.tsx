// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Ring = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgRing',
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
        <path d="M580.256 853.344a68.256 68.256 0 0 1-136.352 4.864l-.16-4.864h136.512zm-32-785.088a32 32 0 0 1 32 32l.032 8.64c155.776 30.208 273.056 161.696 273.056 319.328l-.032 322.688H889.6a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32H134.4a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h36.256V428.192c0-157.632 117.28-289.12 273.056-319.296v-8.64a32 32 0 0 1 32-32h72.544z" />
      </svg>
    );
  },
});