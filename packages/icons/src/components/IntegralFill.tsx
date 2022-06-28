// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M673.152 64a64 64 0 0 1 48.864 22.656l158.848 187.712A64 64 0 0 1 896 315.712V864a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zM640 576H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64zm0-192H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64z"/></svg>';

export const IntegralFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
