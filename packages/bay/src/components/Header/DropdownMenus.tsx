import { defineComponent } from 'vue';
import { ElDropdown, ElIcon } from 'element-plus';
import { ArrowDown, Signout, Translate, ClassificationSquare } from '@wakeadmin/icons';

import { useBayModel, useAsset } from '@/hooks';

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
    const defaultAvatar = useAsset('BAY_AVATAR', AVATAR_DEFAULT);

    const handleCommand = (name: string) => {
      switch (name) {
        case BuiltinCommands.EXIT:
          bay.signout();
          break;
        case BuiltinCommands.SWITCH_LANGUAGE:
          // TODO:
          break;
        default:
          // 扩展路由
          bay.openByIdentifierPath(name);
          break;
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
                <ElDropdown.DropdownItem command={BuiltinCommands.SWITCH_LANGUAGE} icon={Translate}>
                  多语言 TODO:
                </ElDropdown.DropdownItem>
                {buttons?.map(button => {
                  return (
                    <ElDropdown.DropdownItem
                      key={button.uid}
                      command={button.identifierPath}
                      icon={button.icon ?? ClassificationSquare}
                    >
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
