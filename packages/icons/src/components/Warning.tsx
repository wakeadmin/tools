// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 68.256c245.056 0 443.744 198.688 443.744 443.744 0 245.056-198.688 443.744-443.744 443.744-245.056 0-443.744-198.688-443.744-443.744C68.256 266.944 266.944 68.256 512 68.256zm0 64c-209.728 0-379.744 170.016-379.744 379.744 0 209.728 170.016 379.744 379.744 379.744 209.728 0 379.744-170.016 379.744-379.744 0-209.728-170.016-379.744-379.744-379.744zm2.144 516.288a32 32 0 0 1 32 32v4.256a32 32 0 0 1-32 32h-4.288a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h4.288zm0-341.344a32 32 0 0 1 32 32v243.2a32 32 0 0 1-32 32h-4.288a32 32 0 0 1-32-32V339.2a32 32 0 0 1 32-32h4.288z"/></svg>';

export const Warning = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
