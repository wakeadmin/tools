import { BayModel } from '@/BayModel';

export interface MenusProps {
  bay: BayModel;
}

export const Menus = (props: MenusProps) => {
  const { bay } = props;

  return (
    <div class="bay-header__menus">
      {bay.menu?.topMenus.map(item => {
        const handleMenuClick = (evt: MouseEvent) => {
          evt.preventDefault();
          if (item.url) {
            bay.openTreeNode(item);
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
            {item.name}
            {!!(!item.url && item.children.length) && (
              <div class="bay-header__submenus">
                {item.children.map(child => {
                  const handleSubMenuClick = (evt: MouseEvent) => {
                    evt.preventDefault();
                    evt.stopPropagation();

                    if (child.url) {
                      bay.openTreeNode(child);
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
};
