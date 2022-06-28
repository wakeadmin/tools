// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="128" height="128"><path fill="currentColor" d="M864 128a64 64 0 0 1 64 64v544a64 64 0 0 1-64 64H608l-96 96-96-96H160a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64h704zm0 64H160v544h282.496L512 805.472 581.504 736H864V192zM361.6 448a41.6 41.6 0 1 1 0 83.2 41.6 41.6 0 0 1 0-83.2zm320 0a41.6 41.6 0 1 1 0 83.2 41.6 41.6 0 0 1 0-83.2zm-160 0a41.6 41.6 0 1 1 0 83.2 41.6 41.6 0 0 1 0-83.2z"/></svg>';

export const Comment = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
