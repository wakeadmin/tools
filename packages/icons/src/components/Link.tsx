// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M571.84 418.016a185.6 185.6 0 0 1 4.96 257.344l-4.928 5.12L408.96 843.392a185.6 185.6 0 0 1-267.424-257.344l4.928-5.12L255.072 472.32a32 32 0 0 1 47.744 42.464l-2.464 2.784-108.64 108.608a121.6 121.6 0 0 0 167.456 176.288l4.512-4.32 162.944-162.912a121.6 121.6 0 0 0 0-171.968 32 32 0 0 1 45.248-45.248zm271.552-271.552a185.6 185.6 0 0 1 4.928 257.344l-4.928 5.12-108.608 108.64a32 32 0 0 1-47.744-42.464l2.496-2.784 108.608-108.64A121.6 121.6 0 0 0 630.72 187.424l-4.544 4.288-162.912 162.944a121.6 121.6 0 0 0 0 171.968 32 32 0 0 1-45.248 45.248 185.6 185.6 0 0 1-4.96-257.344l4.96-5.12 162.88-162.944a185.6 185.6 0 0 1 262.496 0z"/></svg>';

export const Link = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
