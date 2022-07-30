import { ref, defineComponent, PropType, Component, h, CSSProperties, onBeforeUnmount, unref } from 'vue';
import * as BuiltinIcons from '@wakeadmin/icons';
import { getAsset, listenAssets } from '@/services';

const NormalizeBuiltinIcons = Object.keys(BuiltinIcons).reduce<Record<string, Component>>((prev, cur) => {
  prev[cur.toLowerCase()] = (BuiltinIcons as any)[cur];
  return prev;
}, {});

const IMAGE_ICON_STYLE: CSSProperties = {
  width: '1em',
  height: '1em',
  objectFit: 'contain',
};

/**
 * 图标渲染
 */
export const Icon = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
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
    const assetForceUpdated = ref(0);

    // 监听 asset 变化，并强制更新
    const disposer = listenAssets(() => {
      if (typeof props.icon === 'string') {
        assetForceUpdated.value++;
      }
    });

    onBeforeUnmount(disposer);

    return () => {
      const { icon } = props;

      let children: any;

      if (typeof icon === 'string') {
        if (icon.toLowerCase() in NormalizeBuiltinIcons) {
          children = h(NormalizeBuiltinIcons[icon.toLowerCase()]);
        } else {
          const asset = getAsset(icon, icon);
          // 监听 asset 更新
          unref(assetForceUpdated);

          if (asset.includes('<svg')) {
            // svg 内容
            children = h('i', { innerHTML: asset, style: { display: 'contents' } });
          } else if (asset.startsWith('http')) {
            children = h('img', { src: asset, style: IMAGE_ICON_STYLE, alt: 'icon' });
          } else {
            console.warn(`[bay] Icon 仅支持 svg 图片, 目前传入的是: `, asset);
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
