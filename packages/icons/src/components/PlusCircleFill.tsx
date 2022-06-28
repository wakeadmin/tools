// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 68.256c245.056 0 443.744 198.688 443.744 443.744 0 245.056-198.688 443.744-443.744 443.744-245.056 0-443.744-198.688-443.744-443.744C68.256 266.944 266.944 68.256 512 68.256zm2.144 238.944h-4.288a32 32 0 0 0-32 32v138.656H339.2a32 32 0 0 0-32 32v4.288a32 32 0 0 0 32 32l138.656-.032V684.8a32 32 0 0 0 32 32h4.288a32 32 0 0 0 32-32l-.032-138.688H684.8a32 32 0 0 0 32-32v-4.256a32 32 0 0 0-32-32H546.112V339.2a32 32 0 0 0-32-32z"/></svg>';

export const PlusCircleFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
