// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M725.333 256h213.334v85.333h-85.334V896a42.667 42.667 0 0 1-42.666 42.667H213.333A42.667 42.667 0 0 1 170.667 896V341.333H85.333V256h213.334V128a42.667 42.667 0 0 1 42.666-42.667h341.334A42.667 42.667 0 0 1 725.333 128v128zM768 341.333H256v512h512v-512zM384 170.667V256h256v-85.333H384z" fill="currentColor"/></svg>';

export const DeleteBin = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
