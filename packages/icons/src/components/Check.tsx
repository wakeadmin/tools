// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M427.904 794.56a6.4 6.4 0 0 1-9.056 0l-288.96-289.024a6.4 6.4 0 0 1 0-9.056l36.16-36.16a6.4 6.4 0 0 1 9.088 0L423.36 708.544 875.936 256l45.248 45.248-493.28 493.312z"/></svg>';

export const Check = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
