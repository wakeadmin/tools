// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M891.712 136.544a64 64 0 0 1 64 64V857.6a64 64 0 0 1-64 64H132.256a64 64 0 0 1-64-64V200.544a64 64 0 0 1 64-64h759.456z" fill="#1BA9FF"/><path d="M763.616 457.088a96 96 0 0 1 19.104 17.856l3.968 5.216L932.224 686.4v110.976L734.4 517.056a32 32 0 0 0-2.24-2.848l-2.592-2.56-2.88-2.24a32 32 0 0 0-42.048 4.512l-2.528 3.136-273.568 387.488h-78.272L629.824 480.16a96 96 0 0 1 133.792-23.04zM204.76800000000003 426.688a85.344 85.344 0 1 0 170.688 0 85.344 85.344 0 1 0-170.688 0Z" fill="#FFF"/></svg>';

export const FileImg = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
