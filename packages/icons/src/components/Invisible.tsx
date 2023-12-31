// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const Invisible = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvgInvisible',
  inheritAttrs: true,
  setup() {
    const vm = getCurrentInstance()?.proxy;
    return () => {
      let fallthroughProps: any;

      if (isVue2) {
        fallthroughProps = {
          // @ts-ignore
          on: vm?.$listeners,
        };
      }
      return (
        <svg {...fallthroughProps} viewBox="0 0 1024 1024" class="wk-svg">
          <path d="m220.864 155.52 390.144 390.144A104.544 104.544 0 0 0 512 407.456a32 32 0 1 1 0-64 168.544 168.544 0 0 1 147.296 250.496l98.944 98.944c53.216-43.008 104.64-100.8 154.336-173.76l4.8-7.136-4.8-7.168c-119.904-175.968-250.08-264.064-390.944-267.904L512 236.8c-29.984 0-59.36 3.744-88.16 11.264a32 32 0 0 1-16.16-61.92A411.84 411.84 0 0 1 512 172.8c175.744 0 332.8 108.736 470.592 321.824a32 32 0 0 1 0 34.752C926.176 616.64 866.528 686.4 803.68 738.336l47.744 47.744a32 32 0 0 1 0 45.248l-3.04 3.008a32 32 0 0 1-45.248 0L747.968 779.2c-74.464 47.84-153.152 72-235.968 72-175.744 0-332.8-108.736-470.592-321.824a32 32 0 0 1 1.344-36.672l18.944-24.8c73.28-95.04 132.16-160.576 177.824-197.216l-66.944-66.848a32 32 0 0 1 0-45.28l3.04-3.008a32 32 0 0 1 45.248 0zM120.768 496.128l-13.28 17.184 3.936 5.856c119.904 175.968 250.08 264.064 390.944 267.904l9.632.128c65.44 0 128.576-18.048 189.44-54.464l-86.912-86.976A168.544 168.544 0 0 1 378.24 409.472l-93.12-93.184c-39.264 29.792-94.4 89.984-164.352 179.84zM407.488 512a104.544 104.544 0 0 0 161.152 87.872L424.128 455.36a103.936 103.936 0 0 0-16.64 56.64z" />
        </svg>
      );
    };
  },
});
