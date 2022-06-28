// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="m903.637 545.877.555.598L512 938.667 119.808 546.475l.555-.598A277.333 277.333 0 0 1 512 155.307a277.333 277.333 0 0 1 391.637 390.57z" fill="currentColor"/></svg>';

export const HeartFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
