// 此文件自动生成，请勿编辑
import { defineComponent, SVGAttributes, isVue2 } from '@wakeadmin/demi';

// eslint-disable-next-line spaced-comment
export const Vehicle = /*#__PURE__*/ defineComponent<SVGAttributes>({
  name: 'WKSvgVehicle',
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
        <path d="M782.656 128a64 64 0 0 1 63.328 54.656l81.376 551.072a64 64 0 0 1-39.296 68.704v7.808a75.2 75.2 0 1 1-150.432 0l-.032-3.168H286.336v3.168a75.2 75.2 0 1 1-150.4 0v-7.808a64 64 0 0 1-39.296-68.704l81.376-551.072A64 64 0 0 1 241.28 128h541.344zM261.28 572.032c-27.68 0-50.144 23.36-50.144 52.224 0 28.864 22.464 52.224 50.144 52.224 27.712 0 50.144-23.36 50.144-52.224 0-28.864-22.432-52.224-50.144-52.224zm501.44 0c-27.712 0-50.144 23.36-50.144 52.224 0 28.864 22.432 52.224 50.112 52.224 27.712 0 50.144-23.36 50.144-52.224 0-28.864-22.432-52.224-50.144-52.224zM702.656 232.48H321.28a64 64 0 0 0-61.056 44.832l-1.344 5.056-30.08 133.184a64 64 0 0 0 57.632 77.92l4.8.192h441.536a64 64 0 0 0 63.328-73.408l-.896-4.704-30.08-133.184a64 64 0 0 0-62.4-49.92z" />
      </svg>
    );
  },
});
