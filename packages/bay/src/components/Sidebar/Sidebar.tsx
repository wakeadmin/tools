import { defineComponent } from 'vue';
import { NoopArray } from '@wakeadmin/utils';
import { ElMenu, ElIcon } from 'element-plus';
import { ClassificationSquare } from '@wakeadmin/icons';

import { useBayModel } from '@/hooks';

import './index.scss';
import { TreeNode } from '@/tree';

const SubMenu = (props: { menu: TreeNode }) => {
  const { menu } = props;
  const shareProps = {
    key: menu.uid,
    index: menu.identifierPath,
    'v-slots': {
      title: () => (
        <>
          <ElIcon class="bay-sidebar__submenu-icon">
            <ClassificationSquare />
          </ElIcon>
          <span class="bay-sidebar__submenu-title">{menu.name}</span>
        </>
      ),
    },
  };

  if (menu.children.length) {
    return (
      <ElMenu.SubMenu {...shareProps}>
        {menu.children.map(submenu => {
          return (
            <ElMenu.MenuItem key={submenu.uid} index={submenu.identifierPath}>
              {submenu.name}
            </ElMenu.MenuItem>
          );
        })}
      </ElMenu.SubMenu>
    );
  } else {
    return <ElMenu.MenuItem {...shareProps}></ElMenu.MenuItem>;
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
              return <SubMenu key={menu.uid} menu={menu} />;
            })}
          </ElMenu>
        </div>
      );
    };
  },
});
