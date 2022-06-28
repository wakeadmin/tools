// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Calendar = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgCalendar',
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
          d="M309.344 102.4a32 32 0 0 1 32 32l-.032 2.112h341.344V134.4a32 32 0 0 1 32-32h4.288a32 32 0 0 1 32 32l-.032 2.112h102.4c37.728 0 68.288 30.592 68.288 68.288v648.544a68.256 68.256 0 0 1-68.256 68.256H170.656a68.256 68.256 0 0 1-68.256-68.256V204.8c0-37.696 30.56-68.256 68.256-68.256l102.4-.032V134.4a32 32 0 0 1 32-32h4.288zm543.968 341.312H170.656v409.6h682.688l-.032-409.6zm-512 238.944v68.288h-68.224v-68.288h68.288zm204.8 0v68.288h-68.256v-68.288h68.288zm204.8 0v68.288h-68.256v-68.288h68.288zM341.344 512v68.256h-68.256V512h68.288zm204.8 0v68.256h-68.256V512h68.288zm204.8 0v68.256h-68.256V512h68.288zM273.088 204.8h-102.4v170.656h682.656V204.8h-102.4v2.144a32 32 0 0 1-32 32h-4.256a32 32 0 0 1-32-32V204.8H341.312v2.144a32 32 0 0 1-32 32h-4.256a32 32 0 0 1-32-32V204.8z"
        />
      </svg>
    );
  },
});
