// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Label = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgLabel',
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
        <path d="M829.184 150.048c20.672 4.768 37.12 20.096 43.52 40.096l1.28 4.672 51.712 224.224a89.632 89.632 0 0 1-19.744 79.04l-4.224 4.48-399.136 399.2a89.664 89.664 0 0 1-122.496 4.032l-4.288-4.032L122.24 648.192a89.664 89.664 0 0 1-4.032-122.464l4.032-4.32 399.168-399.136a89.632 89.632 0 0 1 77.504-25.152l6.08 1.184 224.192 51.744zm-13.44 58.24L591.52 156.544a29.888 29.888 0 0 0-24.96 5.44l-2.88 2.56-399.2 399.104a29.888 29.888 0 0 0-2.496 39.456l2.496 2.784 253.568 253.568a29.888 29.888 0 0 0 39.424 2.496l2.816-2.496L859.52 460.32a29.864 29.864 0 0 0 8.608-24.064l-.64-3.776-51.712-224.224zm-80.736 80.672a89.632 89.632 0 1 1-126.784 126.784A89.632 89.632 0 0 1 735.04 288.96zm-42.24 42.24a29.888 29.888 0 1 0-42.272 42.272 29.888 29.888 0 0 0 42.24-42.24z" />
      </svg>
    );
  },
});
