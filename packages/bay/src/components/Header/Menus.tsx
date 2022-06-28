import { defineComponent } from 'vue';
import { BayModel } from '@/BayModel';

export interface MenusProps {
  bay: BayModel;
}

export const Menus = (props: MenusProps) => {
  const { bay } = props;

  return (
    <nav class="bay-header__menus">
      {bay.menu?.topMenus.map(item => {
        return (
          <div
            key={item.uid}
            class={['bay-header__menu', { active: item.active }]}
            onClick={() => item.url && bay.openTreeNode(item)}
            title={item.url}
          >
            {item.name}
            {!!(!item.url && item.children.length) && (
              <nav class="bay-header__submenus">
                {item.children.map(child => {
                  return (
                    <div
                      key={child.uid}
                      class={['bay-header__submenu', { active: child.active }]}
                      onClick={() => bay.openTreeNode(child)}
                      title={item.url}
                    >
                      {child.name}
                    </div>
                  );
                })}
              </nav>
            )}
          </div>
        );
      })}
    </nav>
  );
};
