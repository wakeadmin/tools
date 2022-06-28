// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M507.744 64C752.8 64 951.456 262.656 951.456 507.744c0 245.056-198.656 443.712-443.712 443.712C262.656 951.456 64 752.8 64 507.744 64 262.656 262.656 64 507.744 64zM398.848 353.6a32 32 0 0 0-45.248 45.248L466.752 512 353.6 625.152a32 32 0 0 0 45.248 45.248L512 557.248 625.152 670.4a32 32 0 0 0 45.248-45.248L557.248 512 670.4 398.848a32 32 0 0 0-45.248-45.248L512 466.752z" fill="currentColor"/></svg>';

export const CrossCircleFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
