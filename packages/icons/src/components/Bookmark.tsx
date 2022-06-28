// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M213.333 85.333h597.334A42.667 42.667 0 0 1 853.333 128v816.768a21.333 21.333 0 0 1-32.682 18.09L512 769.28 203.35 962.816a21.333 21.333 0 0 1-32.683-18.048V128a42.667 42.667 0 0 1 42.666-42.667z" fill="currentColor"/></svg>';

export const Bookmark = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
