// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M204.8 443.744a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512zm307.2 0a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512zm307.2 0a68.256 68.256 0 1 1 0 136.512 68.256 68.256 0 0 1 0-136.512z"/></svg>';

export const More = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
