// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Signout = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgSignout',
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
        <path d="M378.944 921.6a32 32 0 0 1-28.256 31.776l-3.744.224H213.376c-54.24 0-99.968-38.784-103.04-89.536l-.192-5.472V165.408c0-51.552 43.84-92.128 97.472-94.848l5.76-.16h133.568a32 32 0 0 1 3.744 63.776l-3.744.224H213.376c-20.96 0-36.96 12.896-39.008 27.808l-.224 3.2v693.184c0 15.104 14.592 29.024 34.816 30.816l4.416.192h133.568a32 32 0 0 1 32 32zm462.784-361.696-3.552 3.84-165.504 165.472a34.144 34.144 0 0 1-50.912-45.28l2.624-2.976 134.848-134.848H419.2a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h340.064L624.416 343.04a34.144 34.144 0 0 1 45.312-50.912l2.976 2.656 165.504 165.504c27.328 27.328 28.48 70.88 3.552 99.616z" />
      </svg>
    );
  },
});
