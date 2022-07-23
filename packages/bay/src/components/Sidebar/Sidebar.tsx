import { defineComponent } from 'vue';
import { NoopArray } from '@wakeadmin/utils';
import { ElMenu, ElIcon } from 'element-plus';
import { ClassificationSquare } from '@wakeadmin/icons';

import { useBayModel } from '@/hooks';

import './index.scss';
import { TreeContainer, TreeNode } from '@/tree';
import { BayModel } from '@/BayModel';
import { Icon } from '../Icon';
import { MOUNT_POINT_SIDEBAR_BOTTOM, MOUNT_POINT_SIDEBAR_TOP } from '@/constants';

const preventDefault = (evt: MouseEvent) => {
  evt.preventDefault();
};

const SubMenu = (props: { menu: TreeNode; bay: BayModel }) => {
  const { menu, bay } = props;

  const TitleTag = menu.url ? 'a' : 'span';

  const title = (
    <>
      <ElIcon class="bay-sidebar__submenu-icon">
        <Icon icon={menu.icon ?? ClassificationSquare} />
      </ElIcon>
      <TitleTag
        class="bay-sidebar__submenu-title"
        href={menu.url}
        onClick={preventDefault}
        data-id={menu.identifierPath}
        data-key={menu.matchKey}
      >
        {menu.name}
      </TitleTag>
    </>
  );

  const submenus = TreeContainer.filterMenu(menu.children);

  if (submenus.length > 1) {
    return (
      <ElMenu.SubMenu
        key={menu.uid}
        index={menu.identifierPath}
        v-slots={{
          title: () => title,
        }}
      >
        {submenus.map(submenu => {
          return (
            <ElMenu.MenuItem key={submenu.uid} index={submenu.identifierPath} onClick={() => bay.openTreeNode(submenu)}>
              <a
                class="bay-sidebar__menuitem-title"
                onClick={preventDefault}
                href={submenu.url}
                data-id={submenu.identifierPath}
                data-key={submenu.matchKey}
              >
                {submenu.name}
              </a>
            </ElMenu.MenuItem>
          );
        })}
      </ElMenu.SubMenu>
    );
  } else {
    // 只有一个子节点
    const finalMenu = submenus.length === 1 ? submenus[0] : menu;

    return (
      <ElMenu.MenuItem key={finalMenu.uid} index={finalMenu.identifierPath} onClick={() => bay.openTreeNode(finalMenu)}>
        {title}
      </ElMenu.MenuItem>
    );
  }
};

export const Sidebar = defineComponent({
  name: 'BaySidebar',
  async setup() {
    const bay = useBayModel();

    await bay.waitSetup();

    return () => {
      const menus = bay.menu?.secondaryMenus ?? NoopArray;
      const activeIdentifierPath = bay.menu?.activeSecondaryNode?.identifierPath;

      return (
        <div class={['bay-sidebar', { collapse: bay.menuCollasped }]}>
          <div id={MOUNT_POINT_SIDEBAR_TOP}></div>
          <ElMenu
            defaultActive={activeIdentifierPath}
            class="bay-sidebar__menu"
            collapse={bay.menuCollasped}
            style="--ep-menu-text-color: var(--wk-color-font-regular);--ep-menu-bg-color: var(--wk-color-white)"
            collapseTransition={false}
          >
            {menus.map(menu => {
              return <SubMenu key={menu.uid} menu={menu} bay={bay} />;
            })}
          </ElMenu>
          <div id={MOUNT_POINT_SIDEBAR_BOTTOM}></div>
        </div>
      );
    };
  },
});
