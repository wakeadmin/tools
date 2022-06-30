import { defineComponent, PropType, Component, h } from 'vue';
import * as BuiltinIcons from '@wakeadmin/icons';
import { getAsset } from '@/services';

/**
 * 图标渲染
 */
export const Icon = defineComponent({
  name: 'Icon',
  props: {
    /**
     * 图标
     * 支持图标名称(内置)、或者 assest service 中注册的图标、图标组件
     */
    icon: {
      type: [String, Object] as PropType<keyof typeof BuiltinIcons | string | Component>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { icon } = props;

      let children: any;

      if (typeof icon === 'string') {
        if (icon in BuiltinIcons) {
          children = h((BuiltinIcons as any)[icon]);
        } else {
          const asset = getAsset(icon, icon);

          if (asset.includes('<svg')) {
            // svg 内容
            children = h('i', { innerHTML: asset, style: { display: 'contents' } });
          } else {
            console.warn(`[bay ] Icon 仅支持 svg 图片`);
          }
        }
      } else if (icon != null) {
        children = h(icon);
      } else {
        throw new Error(`[bay] Icon icon 不能为空`);
      }

      return children;
    };
  },
});
