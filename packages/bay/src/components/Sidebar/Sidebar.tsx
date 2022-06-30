import { defineComponent } from 'vue';
import { NoopArray } from '@wakeadmin/utils';
import { ElMenu, ElIcon } from 'element-plus';
import { ClassificationSquare } from '@wakeadmin/icons';

import { useBayModel } from '@/hooks';

import './index.scss';
import { TreeContainer, TreeNode } from '@/tree';
import { BayModel } from '@/BayModel';
import { Icon } from '../Icon';

const SubMenu = (props: { menu: TreeNode; bay: BayModel }) => {
  const { menu, bay } = props;

  const title = (
    <>
      <ElIcon class="bay-sidebar__submenu-icon">
        <Icon icon={menu.icon ?? ClassificationSquare} />
      </ElIcon>
      <span class="bay-sidebar__submenu-title">{menu.name}</span>
    </>
  );

  const submenus = TreeContainer.filterMenu(menu.children);

  if (submenus.length) {
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
              {submenu.name}
            </ElMenu.MenuItem>
          );
        })}
      </ElMenu.SubMenu>
    );
  } else {
    return (
      <ElMenu.MenuItem key={menu.uid} index={menu.identifierPath} onClick={() => bay.openTreeNode(menu)}>
        {title}
      </ElMenu.MenuItem>
    );
  }
};

export const Sidebar = defineComponent({
  name: 'BaySidebar',
  async setup() {
    const bay = useBayModel();

    await bay.setup();

    return () => {
      const menus = bay.menu?.secondaryMenus ?? NoopArray;
      const activeIdentifierPath = bay.menu?.activeSecondaryNode?.identifierPath;

      return (
        <div class="bay-sidebar">
          <ElMenu
            defaultActive={activeIdentifierPath}
            class="bay-sidebar__menu"
            collapse={bay.menuCollasped}
            style="--el-menu-text-color: var(--wk-color-font-regular)"
            collapseTransition={false}
          >
            {menus.map(menu => {
              return <SubMenu key={menu.uid} menu={menu} bay={bay} />;
            })}
          </ElMenu>
        </div>
      );
    };
  },
});
