// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const GiftFill = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgGiftFill',
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
        <path d="M891.072 512v321.088c0 49.696-46.272 89.984-103.36 89.984H236.288c-57.12 0-103.392-40.288-103.392-89.984V512h758.176zM615.36 96a137.856 137.856 0 0 1 137.696 130.976l.16 6.88h103.392a103.36 103.36 0 0 1 0 206.752H167.392a103.36 103.36 0 0 1 0-206.752h103.36a137.856 137.856 0 0 1 237.568-95.2l3.68 4.064 3.68-4.032a137.44 137.44 0 0 1 92.8-42.496l6.944-.192zm68.96 137.856a68.928 68.928 0 0 0-137.664-5.152l-.192 5.12H684.32zm-275.712-68.928a68.928 68.928 0 0 0-68.736 63.776l-.192 5.12h137.856c0-38.048-30.848-68.896-68.928-68.896z" />
      </svg>
    );
  },
});
