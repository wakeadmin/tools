// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M921.6 610.912a32 32 0 0 1 31.776 28.256l.224 3.744V776.48c0 54.272-38.784 99.968-89.536 103.04l-5.472.192H165.408c-51.552 0-92.128-43.84-94.848-97.472l-.16-5.76v-133.6a32 32 0 0 1 63.776-3.744l.224 3.744v133.568c0 20.992 12.896 36.96 27.808 39.04l3.2.192h693.184c15.104 0 29.024-14.592 30.816-34.816l.192-4.416V642.88a32 32 0 0 1 32-32zm-407.456-480.64a32 32 0 0 1 32 32v408.32L680.96 435.744l2.976-2.656a34.144 34.144 0 0 1 45.28 50.944L563.712 649.536l-3.84 3.552c-28.704 24.96-72.256 23.776-99.584-3.552L294.784 484.032l-2.656-2.976a34.144 34.144 0 0 1 50.912-45.312l134.784 134.848.032-408.32a32 32 0 0 1 32-32z"/></svg>';

export const Download = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});