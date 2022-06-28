// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M215.104 78.912c-24.448 9.408-45.984 24.48-66.432 44.928a2138.24 2138.24 0 0 0-42.784 44c-6.368 6.336-12.224 14.72-17.216 24.096-12.576 24.192-17.152 48.768-17.696 83.264l.32 10.304c.096 4.928.096 11.2.096 20.864l.544 5.792c4.672 25.504 8.832 44.32 14.24 62.912 11.296 38.944 28.16 77.504 49.984 115.712l8.96 15.2c9.184 15.296 19.232 31.264 32 51.008l6.592 10.176c16.864 26.016 33.728 47.488 65.376 85.024l15.584 17.856c10.592 12 18.24 20.224 27.136 29.12l16.736 16.544c10.656 10.464 20.448 19.84 30.016 28.672l7.136 6.56c13.344 12.384 27.552 24.704 45.248 39.36l9.6 7.872 21.76 16.992c9.088 6.976 16.096 12.096 23.744 17.344l16.48 11.168c4.352 2.88 8.96 5.856 14.304 9.28l33.6 21.184c23.872 15.232 49.44 28.16 83.328 42.816 32.608 13.888 62.752 23.68 92.992 29.44 19.008 3.392 39.04 5.664 60.384 7.04 5.696.288 10.176.16 15.904-.32l16.896-1.76c16.896-1.536 33.056-6.72 49.856-15.104 11.68-6.016 19.232-11.872 30.624-22.848l10.368-10.112a865.536 865.536 0 0 0 47.168-50.56 142.144 142.144 0 0 0 33.28-79.296 126.016 126.016 0 0 0-12.896-67.552 192.544 192.544 0 0 0-53.696-66.56 585.6 585.6 0 0 0-53.312-39.104c-25.024-16.832-51.392-27.392-80-30.72a129.28 129.28 0 0 0-73.824 12.832c-15.424 7.488-28.608 17.76-44.544 33.12l-13.408 13.504-6.816-3.296c-15.872-8.192-30.88-19.2-54.272-38.912l-16.512-14.112c-4.192-3.712-8.416-7.584-13.504-12.384l-18.72-17.952-27.904-28.224a1070.368 1070.368 0 0 1-70.496-81.28l-4.8-6.464a133.44 133.44 0 0 1-11.232-18.88l-1.888-4.192 3.616-3.712c14.72-15.36 22.784-24.512 31.936-36.448 21.6-28.032 29.76-61.312 24.288-96.768a181.536 181.536 0 0 0-22.72-63.04c-21.28-36.608-43.168-65.6-69.44-89.792l-6.976-6.208c-18.688-15.904-38.368-26.88-60.48-32.544l-7.936-1.76a125.024 125.024 0 0 0-70.592 5.92z"/></svg>';

export const CallFill = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
