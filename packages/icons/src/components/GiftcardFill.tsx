// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M832 608v32H192v-32h640zM192 192a64 64 0 0 1 64-64h512a64 64 0 0 1 64 64v229.44l-320.032 98.432L192 421.44V192zm643.776 292.256-323.808 99.616-323.744-99.616A96 96 0 0 0 64 576.032v265.344a96 96 0 0 0 96 96h704a96 96 0 0 0 96-96V576a96 96 0 0 0-124.224-91.776z"/></svg>';

export const GiftcardFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
