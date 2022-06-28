// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG =
  '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M886.592 288.704A31.817 31.817 0 0 1 896 311.296V928c0 17.696-14.304 32-32 32H160c-17.696 0-32-14.304-32-32V96c0-17.696 14.304-32 32-32h488.704a32.169 32.169 0 0 1 22.72 9.408l215.168 215.296z" fill="#1F67D3"/><path d="M307.36 754.976V635.2h79.712c73.664 0 110.72-31.456 110.72-94.336 0-62.464-36.64-93.504-109.856-93.504h-127.52v307.616h46.944zm76.704-159.84H307.36V487.424h76.704c22.816 0 39.616 4.32 50.4 12.928 10.752 7.776 16.352 21.536 16.352 40.512 0 18.944-5.6 32.736-15.936 41.344-10.752 8.64-27.552 12.928-50.816 12.928zm269.664 165.856c38.784 0 68.928-7.744 90.464-23.264 21.536-15.936 32.32-37.472 32.32-65.056 0-28.416-13.344-50.4-39.648-66.336-12.032-7.328-39.2-17.216-80.544-30.144-28.864-8.64-46.528-15.072-53.44-18.976-15.488-8.16-22.816-18.944-22.816-32.736 0-15.488 6.464-26.688 19.84-33.6 10.752-6.016 26.24-9.056 46.496-9.056 23.264 0 40.512 4.32 52.576 13.376 12.064 8.64 19.808 23.264 24.128 43.072h46.528c-3.04-33.6-15.104-58.144-36.64-74.08-20.224-15.52-48.224-22.848-84-22.848-32.736 0-59.872 7.328-81.408 21.984-22.848 15.488-34.048 36.608-34.048 63.744 0 26.72 11.648 47.36 35.328 61.6 9.472 5.184 32.736 13.344 70.656 25.408 34.016 10.368 54.272 17.248 61.184 20.704 19.36 9.92 29.28 23.264 29.28 40.48 0 13.76-6.88 24.544-20.672 32.32-13.76 7.744-32.32 12.064-55.584 12.064-25.856 0-44.8-4.736-57.28-14.24-13.792-10.336-22.4-28-25.856-52.096h-46.528c2.56 38.752 16.384 67.2 41.792 85.28 21.12 14.656 50.4 22.4 87.872 22.4z" fill="#FFF"/><path d="M826.88 266.688 693.312 133.12a16 16 0 0 0-27.328 11.296v133.6a16 16 0 0 0 16 16h133.6a16 16 0 0 0 11.296-27.328z" fill="#578EE1"/></svg>';

export const FilePs = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});