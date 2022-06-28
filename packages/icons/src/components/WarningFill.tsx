// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zm2.464 585.856h-4.928a32 32 0 0 0-32 32v4.928a32 32 0 0 0 32 32h4.928a32 32 0 0 0 32-32v-4.928a32 32 0 0 0-32-32zm0-344.64h-4.928a32 32 0 0 0-32 32v246.176a32 32 0 0 0 32 32h4.928a32 32 0 0 0 32-32V337.216a32 32 0 0 0-32-32z"/></svg>';

export const WarningFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
