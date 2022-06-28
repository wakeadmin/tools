// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M699.744 546.144a187.744 187.744 0 0 1 187.712 187.712V889.6a32 32 0 0 1-32 32H168.544a32 32 0 0 1-32-32V733.856a187.744 187.744 0 0 1 187.712-187.712h375.488zm0 64H324.256a123.744 123.744 0 0 0-123.552 117.344l-.16 6.4V857.6h622.912V733.856a123.744 123.744 0 0 0-117.344-123.552l-6.4-.16zM514.624 102.4a204.8 204.8 0 1 1 0 409.6 204.8 204.8 0 0 1 0-409.6zm0 64a140.8 140.8 0 1 0 0 281.6 140.8 140.8 0 0 0 0-281.6z"/></svg>';

export const People = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
