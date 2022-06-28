// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M825.76 246.496 560.256 512 825.76 777.504l-48.256 48.256-265.536-265.504L246.496 825.76l-48.256-48.256 265.472-265.536L198.24 246.496l48.256-48.256L512 463.744 777.504 198.24z"/></svg>';

export const Close = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
