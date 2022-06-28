// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M804.571 621.714q0 14.857-10.857 25.715l-256 256Q526.857 914.286 512 914.286t-25.714-10.857l-256-256q-10.857-10.858-10.857-25.715T230.286 596 256 585.143h512q14.857 0 25.714 10.857t10.857 25.714z" fill="currentColor"/></svg>';

export const SortDesc = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
