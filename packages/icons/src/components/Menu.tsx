// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M904.544 763.744c7.04 0 12.8 5.728 12.8 12.8V832a12.8 12.8 0 0 1-12.8 12.8H119.456a12.8 12.8 0 0 1-12.8-12.8v-55.456c0-7.072 5.76-12.8 12.8-12.8h785.088zm0-283.744c7.04 0 12.8 5.76 12.8 12.8v55.456a12.8 12.8 0 0 1-12.8 12.8H119.456a12.8 12.8 0 0 1-12.8-12.8V492.8c0-7.04 5.76-12.8 12.8-12.8h785.088zm0-283.744c7.04 0 12.8 5.76 12.8 12.8v55.488a12.8 12.8 0 0 1-12.8 12.8H119.456a12.8 12.8 0 0 1-12.8-12.8v-55.488c0-7.04 5.76-12.8 12.8-12.8h785.088z"/></svg>';

export const Menu = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
