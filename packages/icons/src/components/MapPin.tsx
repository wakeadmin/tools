// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M783.53 740.864 512 1012.394l-271.53-271.53a384 384 0 1 1 543.06 0zM512 554.667A85.333 85.333 0 1 0 512 384a85.333 85.333 0 0 0 0 170.667z" fill="currentColor"/></svg>';

export const MapPin = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
