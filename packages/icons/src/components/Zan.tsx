// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="128" height="128"><path fill="currentColor" d="M580.16 96.192 576.64 96c-39.616 0-65.248 18.336-74.08 48.48l-1.024 3.808a73.792 73.792 0 0 0-1.888 10.784l-.672 7.904-1.376 2.464v8.512c0 51.104-24.16 103.072-65.184 152.64a451.104 451.104 0 0 1-46.56 48.32l-10.784 9.312-5.536 4.544-4.032 3.104-12.992 9.6v403.552c0 54.592 55.776 84 104.544 84h293.28c27.232 0 44.928-18.368 60.864-47.776 8-14.848 14.4-30.72 19.008-44.704l5.632-19.072 9.376-32.768 8.64-31.2 7.936-29.568 7.232-28 6.56-26.464 3.008-12.672 5.568-24.192 2.56-11.552 4.576-22.016 2.08-10.464 3.072-16.512 2.56-14.816 2.048-13.216 2.24-16.864.96-9.312.544-7.872.192-4.8c0-35.904-16.928-60.864-43.712-72.576a84.928 84.928 0 0 0-33.12-7.072l-6.88.192-151.68-.096 1.76-8c27.136-127.52 12.096-210.208-34.304-255.68-19.936-19.584-40.8-27.968-56.864-29.76zm-11.872 63.936 5.344-.128 2.944 1.088c5.12 2.048 10.464 5.44 15.68 10.56 31.68 31.04 41.6 102.208 8.64 230.176L586.912 453.6l239.104-.064a24.128 24.128 0 0 1 9.632 1.728c3.36 1.472 4.928 3.328 5.28 10.048l.032 3.552-.32 5.472-.64 7.008-1.024 8.544-2.304 15.84-3.296 19.52-4.864 25.28-4.448 21.312-5.056 22.784-5.76 24.256-6.336 25.76-7.04 27.264-7.744 28.8-8.416 30.4-9.152 31.936-5.184 17.6a220.224 220.224 0 0 1-14.464 34.112l-2.144 3.808c-2.112 3.584-4.16 6.592-5.952 8.832l-1.472 1.632H457.056l-3.936-.16c-17.28-1.504-36.608-12.256-36.608-19.84l-.032-372 3.2-2.688a515.328 515.328 0 0 0 62.016-62.912l7.328-9.056c42.88-54.464 69.664-112.896 72.352-174.176l.128-5.248.608-3.328.448-4.288.768-9.408.384-2.464.512-1.664c.384-1.056 1.056-1.472 4.064-1.664zM270.272 389.76h-117.76c-22.4 0-39.872 10.688-49.28 27.712-5.344 9.6-7.104 18.592-7.232 26.208l24.192 372.608c-.064 37.792 27.52 52.544 55.584 53.44h102.432c18.208 0 33.44-6.816 43.136-19.456 6.784-8.8 9.376-18.048 9.728-26.592l.032-373.888c0-24.096-11.936-42.528-30.656-52.352a66.656 66.656 0 0 0-30.176-7.68zm-3.2 63.968v352h-83.488l-22.912-352h106.4z"/></svg>';

export const Zan = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
