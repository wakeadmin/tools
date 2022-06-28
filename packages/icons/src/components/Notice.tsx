// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Notice = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgNotice',
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
          d="M580.256 853.344a68.256 68.256 0 0 1-136.352 4.864l-.16-4.864h136.512zm-32-785.088a32 32 0 0 1 32 32l.032 8.64c155.776 30.208 273.056 161.696 273.056 319.328l-.032 322.688H889.6a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32H134.4a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h36.256V428.192c0-157.632 117.28-289.12 273.056-319.296v-8.64a32 32 0 0 1 32-32h72.544zm7.776 101.44-.416.128c-2.368.544-4.8.832-7.36.832h-72.512c-2.688 0-5.28-.32-7.776-.96-130.016 19.52-229.248 124.288-233.184 250.688l-.128 7.84-.032 322.688H789.28l.064-322.688c0-129.92-100.64-238.592-233.312-258.56z"
        />
      </svg>
    );
  },
});
