// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zm0 64C298.016 128 128 298.016 128 507.744c0 209.696 170.016 379.712 379.744 379.712 209.696 0 379.712-170.016 379.712-379.712C887.456 298.016 717.44 128 507.744 128zm224.544 264.672 7.136 7.392a16 16 0 0 1-.384 22.624L462.816 689.44a16 16 0 0 1-22.624-.384l-155.488-160.96a16 16 0 0 1 .416-22.656l.128-.128 12.256-11.52a16 16 0 0 1 21.76-.192l133.12 121.44 257.92-223.36a16 16 0 0 1 21.984.992z"/></svg>';

export const CheckCircleOutline = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
