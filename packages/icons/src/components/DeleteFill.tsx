// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M598.4 68.256a16 16 0 0 1 16 16v52.256h309.344a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32H883.84l-35.68 684.448a34.144 34.144 0 0 1-34.08 32.352H209.888a34.144 34.144 0 0 1-34.08-32.352l-35.744-684.48-39.808.032a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32H409.6l.032-52.288a16 16 0 0 1 16-16h172.8zm-186.656 307.2h-4.288a32 32 0 0 0-32 32v243.2a32 32 0 0 0 32 32h4.288a32 32 0 0 0 32-32v-243.2a32 32 0 0 0-32-32zm204.8 0h-4.288a32 32 0 0 0-32 32v243.2a32 32 0 0 0 32 32h4.288a32 32 0 0 0 32-32v-243.2a32 32 0 0 0-32-32z"/></svg>';

export const DeleteFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
