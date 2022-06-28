// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m916.48 312.608-370.56 389.76a47.104 47.104 0 0 1-64.256 3.392l-3.552-3.392L107.52 312.64a3.2 3.2 0 0 1 2.304-5.408h86.4a6.4 6.4 0 0 1 4.608 1.984L512 636.384l311.136-327.2a6.4 6.4 0 0 1 4.64-1.984h86.4a3.2 3.2 0 0 1 2.304 5.408z"/></svg>';

export const ArrowDown = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
