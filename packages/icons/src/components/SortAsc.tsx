// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M804.571 402.286q0 14.857-10.857 25.714T768 438.857H256q-14.857 0-25.714-10.857t-10.857-25.714 10.857-25.715l256-256q10.857-10.857 25.714-10.857t25.714 10.857l256 256q10.857 10.858 10.857 25.715z" fill="currentColor"/></svg>';

export const SortAsc = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
