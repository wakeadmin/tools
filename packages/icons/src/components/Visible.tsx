// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 172.8c175.744 0 332.8 108.736 470.592 321.824a32 32 0 0 1 0 34.752C844.8 742.496 687.744 851.2 512 851.2c-175.744 0-332.8-108.736-470.592-321.824a32 32 0 0 1 0-34.752C179.2 281.504 336.256 172.8 512 172.8zm0 64c-144.576 0-277.952 88.064-400.576 268.032L106.592 512l4.832 7.168c119.904 175.968 250.08 264.064 390.944 267.904l9.632.128c144.576 0 277.952-88.064 400.576-268.032l4.8-7.168-4.8-7.168c-119.904-175.968-250.08-264.064-390.944-267.904zm0 106.656a168.544 168.544 0 1 1 0 337.088 168.544 168.544 0 0 1 0-337.088zm0 64a104.544 104.544 0 1 0 0 209.088 104.544 104.544 0 0 0 0-209.088z"/></svg>';

export const Visible = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
