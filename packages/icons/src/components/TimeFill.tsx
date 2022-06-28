// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zm-28 258.464a32.32 32.32 0 0 0-32.32 32.32v193.824c0 17.856 14.464 32.32 32.32 32.32h258.464a32.32 32.32 0 0 0 0-64.64H516.32V354.784a32.32 32.32 0 0 0-32.32-32.32z"/></svg>';

export const TimeFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
