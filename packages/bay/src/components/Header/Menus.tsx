import { defineComponent, PropType, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

import { BayModel } from '@/BayModel';
import { getMenuI18nKey } from '@/utils';

export const Menus = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Menus',
  props: {
    bay: {
      required: true,
      type: Object as PropType<BayModel>,
    },
  },
  setup(props) {
    const { bay } = toRefs(props);
    const { t } = useI18n();

    return () => (
      <div class="bay-header__menus">
        {bay.value.menu?.topMenus.map(item => {
          const handleMenuClick = (evt: MouseEvent) => {
            evt.preventDefault();
            if (item.url) {
              bay.value.openTreeNode(item);
            }
          };
          return (
            <a
              key={item.uid}
              class={['bay-header__menu', { active: item.active }]}
              data-id={item.identifierPath}
              data-key={item.matchKey}
              onClick={handleMenuClick}
              href={item.url}
            >
              {t(getMenuI18nKey(item.identifierPath), item.name)}
              {!!(!item.url && item.children.length) && (
                <div class="bay-header__submenus">
                  {item.children.map(child => {
                    const handleSubMenuClick = (evt: MouseEvent) => {
                      evt.preventDefault();
                      evt.stopPropagation();

                      if (child.url) {
                        bay.value.openTreeNode(child);
                      }
                    };

                    return (
                      <a
                        key={child.uid}
                        class={['bay-header__submenu', { active: child.active }]}
                        onClick={handleSubMenuClick}
                        data-id={child.identifierPath}
                        data-key={child.matchKey}
                        title={item.url}
                      >
                        {child.name}
                      </a>
                    );
                  })}
                </div>
              )}
            </a>
          );
        })}
      </div>
    );
  },
});
