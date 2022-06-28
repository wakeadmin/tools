// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 938.667 119.808 546.475c-93.013-109.568-88.15-273.92 15.061-377.174A277.333 277.333 0 0 1 512 155.307a277.333 277.333 0 0 1 391.637 390.57L512 938.667zm326.912-448.384a192 192 0 0 0-271.147-270.379L512 268.032l-55.765-48.128a192 192 0 0 0-271.147 270.379l4.864 5.632L512 818.005l322.048-322.09 4.864-5.632z" fill="currentColor"/></svg>';

export const Heart = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
