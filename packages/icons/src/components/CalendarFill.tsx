// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M309.344 102.4a32 32 0 0 1 32 32l-.032 2.112h341.344V134.4a32 32 0 0 1 32-32h4.288a32 32 0 0 1 32 32l-.032 2.112h102.4c37.728 0 68.288 30.592 68.288 68.288v648.544a68.256 68.256 0 0 1-68.256 68.256H170.656a68.256 68.256 0 0 1-68.256-68.256V204.8c0-37.696 30.56-68.256 68.256-68.256l102.4-.032V134.4a32 32 0 0 1 32-32h4.288zm32 580.256h-68.288v68.288h68.288v-68.288zm204.8 0h-68.288v68.288h68.288v-68.288zm204.8 0h-68.288v68.288h68.288v-68.288zM341.344 512h-68.288v68.256h68.288V512zm204.8 0h-68.288v68.256h68.288V512zm204.8 0h-68.288v68.256h68.288V512zm166.4-136.544H106.656v68.288h810.688v-68.288z"/></svg>';

export const CalendarFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
