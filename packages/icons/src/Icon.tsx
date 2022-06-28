import { HTMLAttributes } from '@wakeadmin/demi';
import { declareComponent, declareProps, fallthrough } from '@wakeadmin/h';
import './style.css';

export const Icon = declareComponent({
  name: 'Icon',
  props: declareProps<
    {
      /**
       * SVG 图标
       */
      icon: string;
      /**
       * 颜色
       */
      color?: string;

      /**
       * 大小，默认为 1em
       */
      size?: string;
    } & HTMLAttributes
  >(['icon', 'color', 'size']),
  setup(props, context) {
    return () => {
      const { class: className, style } = context.attrs;

      return fallthrough('i', context, {
        class: ['wk-icon', className],
        style: [
          style,
          {
            color: props.color ?? 'currentColor',
            fontSize: props.size ?? '1em',
          },
        ],
        innerHTML: props.icon,
      });
    };
  },
});
