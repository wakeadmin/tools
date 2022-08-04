import { defineComponent, onMounted, ref } from 'vue';
import { useBayModel } from '@/hooks';
import { useT, getMenuI18nKey } from '@/utils';

import style from './Header.scss?inline';

/**
 * 页面头部布局
 */
export const Header = defineComponent({
  styles: [style],
  name: 'BayLayoutHeader',
  props: {
    /**
     * 标题，可选，也可以使用 title slot
     */
    title: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const bay = useBayModel();
    const t = useT();
    const defaultSlot = ref<HTMLSlotElement | null>(null);
    const hasDefaultSlot = ref(false);

    const handleSlotChange = () => {
      hasDefaultSlot.value = !!defaultSlot.value?.assignedNodes().length;
    };

    onMounted(() => {
      handleSlotChange();
    });

    return () => {
      const activeNode = bay.menu?.activeNode;
      const tabMenus = bay.menu?.tabMenus;

      return (
        <div class="bay-layout-header">
          <div class={['bay-layout-header__top', { lonely: !hasDefaultSlot.value }]}>
            <div class="bay-layout-header__left">
              {(tabMenus?.length ?? 0) > 1 ? (
                <div class="bay-layout-header__tabs">
                  {tabMenus?.map(menu => {
                    return (
                      <div
                        class={['bay-layout-header__tab', { active: menu.active }]}
                        key={menu.uid}
                        onClick={() => bay.openTreeNode(menu)}
                        title={menu.url}
                      >
                        {t(getMenuI18nKey(menu.identifierPath), menu.name)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div class="bay-layout-header__title">
                  <slot name="title">
                    {props.title ??
                      (activeNode ? t(getMenuI18nKey(activeNode.identifierPath), activeNode.name) : '未配置标题')}
                  </slot>
                </div>
              )}
            </div>
            {/* 扩展区域，通常放置按钮 */}
            <div class="bay-layout-header__extra">
              <slot name="extra" />
            </div>
          </div>
          {/* 内容区， 通常是条件筛选 */}
          <div class="bay-layout-header__body">
            <slot ref={defaultSlot} onSlotchange={handleSlotChange}></slot>
          </div>
        </div>
      );
    };
  },
});
