import { defineComponent, onBeforeUnmount, ref } from 'vue';
import { ElDropdown, ElIcon } from 'element-plus';
import { ArrowDown, Signout, Translate, ClassificationSquare } from '@wakeadmin/icons';

import { getHeaderDropdowns, HeaderDropdownItemDesc, subscribeHeaderDropdownChange } from '@/services';
import { useBayModel, useAsset } from '@/hooks';

import { Icon } from '../Icon';

import AVATAR_DEFAULT from './avatar-default.png';

/**
 * 内置指令
 */
const enum BuiltinCommands {
  EXIT = 'exit',
  SWITCH_LANGUAGE = 'switch-language',
}

export const DropdownMenus = defineComponent({
  name: 'DropdownMenus',
  setup() {
    const bay = useBayModel();
    const defaultAvatar = useAsset('IMG_BAY_AVATAR', AVATAR_DEFAULT);
    const extendsMenus = ref(getHeaderDropdowns());
    const dispose = subscribeHeaderDropdownChange(() => {
      extendsMenus.value = getHeaderDropdowns();
    });

    onBeforeUnmount(dispose);

    const handleCommand = (name: string) => {
      switch (name) {
        case BuiltinCommands.EXIT:
          bay.signout();
          break;
        case BuiltinCommands.SWITCH_LANGUAGE:
          // TODO:
          break;
        default: {
          let menuItem: HeaderDropdownItemDesc | undefined;
          if (extendsMenus.value.length && (menuItem = extendsMenus.value.find(i => i.id === name))) {
            // 扩展菜单点击
            menuItem.onClick?.();
          } else {
            // 扩展路由
            bay.openByIdentifierPath(name);
          }
          break;
        }
      }
    };

    return () => {
      const name = bay.sessionInfo?.userInfo.userName;
      const avatar = defaultAvatar.value;
      const buttons = bay.menu?.topButtons;

      return (
        <ElDropdown
          size="large"
          placement="bottom-end"
          onCommand={handleCommand}
          v-slots={{
            dropdown: () => (
              <ElDropdown.DropdownMenu>
                {/* 子应用扩展 */}
                {extendsMenus.value.map(menu => {
                  return (
                    <ElDropdown.DropdownItem command={menu.id} key={menu.id}>
                      <ElIcon>
                        <Icon
                          icon={(typeof menu.icon === 'function' ? menu.icon() : menu.icon) ?? ClassificationSquare}
                        />
                      </ElIcon>
                      {typeof menu.title === 'function' ? menu.title() : menu.title}
                    </ElDropdown.DropdownItem>
                  );
                })}

                <ElDropdown.DropdownItem command={BuiltinCommands.SWITCH_LANGUAGE} icon={Translate}>
                  多语言 TODO:
                </ElDropdown.DropdownItem>

                {/* 扩展 */}
                {buttons?.map(button => {
                  return (
                    <ElDropdown.DropdownItem key={button.uid} command={button.identifierPath}>
                      <ElIcon>
                        <Icon icon={button.icon ?? ClassificationSquare} />
                      </ElIcon>
                      {button.name}
                    </ElDropdown.DropdownItem>
                  );
                })}
                <ElDropdown.DropdownItem command={BuiltinCommands.EXIT} icon={Signout}>
                  退出登录
                </ElDropdown.DropdownItem>
              </ElDropdown.DropdownMenu>
            ),
          }}
        >
          <div class="bay-header__dropdown">
            <img class="bay-header__dropdown-img" src={avatar} alt="avatar" />
            <span class="bay-header__dropdown-name">{name}</span>
            <ElIcon>
              <ArrowDown />
            </ElIcon>
          </div>
        </ElDropdown>
      );
    };
  },
});
