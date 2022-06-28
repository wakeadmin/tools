// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M640.384 102.4a102.4 102.4 0 0 1 72.8 30.4L892 313.504a102.4 102.4 0 0 1 29.6 72.032V857.6a64 64 0 0 1-64 64H166.4a64 64 0 0 1-64-64V166.4a64 64 0 0 1 64-64h473.984zM684.8 546.144H339.2a32 32 0 0 0-32 32V921.6h68.256V614.4h273.056v307.2H716.8V578.144a32 32 0 0 0-32-32zM377.6 288H262.4a6.4 6.4 0 0 0-6.4 6.4v51.2c0 3.52 2.88 6.4 6.4 6.4h115.2a6.4 6.4 0 0 0 6.4-6.4v-51.2a6.4 6.4 0 0 0-6.4-6.4z"/></svg>';

export const SaveFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
