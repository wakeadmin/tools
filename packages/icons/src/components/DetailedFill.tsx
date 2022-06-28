// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M832 64a64 64 0 0 1 64 64v768a64 64 0 0 1-64 64H608a96 96 0 0 0-191.84-5.632L416 960H192a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h640zM640 512H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64zm0-192H384a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64z"/></svg>';

export const DetailedFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
