// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M464.64 527.36a32 32 0 0 1 32 32v152.32A184.32 184.32 0 0 1 312.32 896H160a32 32 0 0 1-32-32V711.68a184.32 184.32 0 0 1 184.32-184.32zm247.04 0A184.32 184.32 0 0 1 896 711.68V864a32 32 0 0 1-32 32H711.68a184.32 184.32 0 0 1-184.32-184.32V559.36a32 32 0 0 1 32-32h152.32zM312.32 128a184.32 184.32 0 0 1 184.32 184.32v152.32a32 32 0 0 1-32 32H312.32A184.32 184.32 0 0 1 128 312.32V160a32 32 0 0 1 32-32h152.32zM864 128a32 32 0 0 1 32 32v152.32a184.32 184.32 0 0 1-184.32 184.32H559.36a32 32 0 0 1-32-32V312.32A184.32 184.32 0 0 1 711.68 128z"/></svg>';

export const ClassificationFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
