// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M800 64a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zM672 256a32 32 0 0 0-32 32v26.656l-.16 6.4a128 128 0 0 1-255.84-6.4V288l-.224-3.744A32 32 0 0 0 320 288v26.656l.128 7.2a192 192 0 0 0 383.872-7.2V288l-.224-3.744A32 32 0 0 0 672 256z"/></svg>';

export const ShoppingBagFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
