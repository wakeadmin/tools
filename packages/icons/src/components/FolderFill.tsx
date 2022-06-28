// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const FolderFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgFolderFill',
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
          d="M511.872 102.4a64 64 0 0 1 53.248 28.48l49.28 73.92h277.344a64 64 0 0 1 64 64v588.8a64 64 0 0 1-64 64H132.256a64 64 0 0 1-64-64V166.4a64 64 0 0 1 64-64h379.616zM819.2 375.456H477.856v68.288H819.2v-68.288z"
        />
      </svg>
    );
  },
});
