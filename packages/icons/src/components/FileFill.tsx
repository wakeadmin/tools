// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M582.4 68.256v232.128l.16 4.992a72.96 72.96 0 0 0 72.8 67.968h232.096v514.112a68.256 68.256 0 0 1-68.256 68.288H204.8a68.256 68.256 0 0 1-68.256-68.288V136.544c0-37.728 30.56-68.288 68.256-68.288h377.6zm78.848 28.128 198.08 198.08a96 96 0 0 1 12.192 14.88H655.36l-2.048-.256a8.96 8.96 0 0 1-6.912-8.704V84.256a96 96 0 0 1 14.848 12.128z"/></svg>';

export const FileFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
