// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M640 128h256v213.333h-85.333v-128H640V128zm-256 0v85.333H213.333v128H128V128h256zm256 768v-85.333h170.667v-128H896V896H640zm-256 0H128V682.667h85.333v128H384V896zM128 469.333h768v85.334H128v-85.334z" fill="currentColor"/></svg>';

export const Qrcode = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
