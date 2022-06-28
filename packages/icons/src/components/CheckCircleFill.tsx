// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zm224.544 328.672a16 16 0 0 0-21.984-.96l-257.92 223.36L319.264 493.6a16 16 0 0 0-21.76.16l-12.256 11.52a16.032 16.032 0 0 0-.544 22.784l155.488 160.992a16 16 0 0 0 22.624.384L739.04 422.688a16 16 0 0 0 .384-22.624z" fill="currentColor"/></svg>';

export const CheckCircleFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
