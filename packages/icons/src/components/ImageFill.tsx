// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M891.744 136.544a64 64 0 0 1 64 64v655.104L690.688 480.16a96 96 0 0 0-156.864 0L222.208 921.6h-89.92a64 64 0 0 1-64-64V200.544a64 64 0 0 1 64-64h759.456zm-261.024 372.8 2.88 2.304a32 32 0 0 1 4.8 5.44l281.088 398.208a63.744 63.744 0 0 1-27.744 6.304H300.48l285.632-404.544a32 32 0 0 1 44.608-7.68zm-340.576-168a85.344 85.344 0 1 0 0 170.656 85.344 85.344 0 0 0 0-170.656z"/></svg>';

export const ImageFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
