// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Shopping = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgShopping',
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
        <path d="M416.896 800a64.896 64.896 0 1 1 0 129.792 64.896 64.896 0 0 1 0-129.792zm324.48 0a64.896 64.896 0 1 1 0 129.792 64.896 64.896 0 0 1 0-129.792zM235.68 96a32 32 0 0 1 31.68 27.232l15.392 102.528 547.904.032a97.344 97.344 0 0 1 97.184 91.616l.16 5.728c0 3.296-.16 6.592-.512 9.888l-.64 4.928-44.896 324.48a97.344 97.344 0 0 1-90.496 82.368l-5.728.16H378.816a97.344 97.344 0 0 1-95.168-76.896l-1.088-5.664-2.848-20.096-72.256-481.408h-79.008a32.448 32.448 0 0 1 0-64.896H235.68zm594.976 194.688H296.032l48.512 346.368 2.304 15.104h-.192l.096.384c2.24 14.624 14.016 25.696 28.416 27.328l3.648.192h406.912c14.784 0 27.52-9.952 31.328-23.936l.736-3.584 44.928-324.48a32.448 32.448 0 0 0-32.064-37.376zm-183.04 259.584a32 32 0 0 1 32 32v.896a32 32 0 0 1-32 32H516.928a32 32 0 0 1-32-32v-.896a32 32 0 0 1 32-32h130.688z" />
      </svg>
    );
  },
});
