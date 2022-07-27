import { defineComponent, onBeforeUnmount, ref } from 'vue';
import { ElDropdown, ElIcon } from 'element-plus';
import { ArrowDown, Signout, Translate, ClassificationSquare } from '@wakeadmin/icons';
import { useInject } from '@wakeadmin/framework';
import { useI18n } from 'vue-i18n';

import { getHeaderDropdowns, HeaderDropdownItemDesc, subscribeHeaderDropdownChange } from '@/services';
import { useBayModel, useAsset } from '@/hooks';
import { DEFAULT_LANGUAGE_SUPPORTS } from '@/constants';
import { getMenuI18nKey } from '@/utils';

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
    const { t } = useI18n();
    const bay = useBayModel();
    const defaultAvatar = useAsset('IMG_BAY_AVATAR', AVATAR_DEFAULT);
    const extendsMenus = ref(getHeaderDropdowns());
    const dispose = subscribeHeaderDropdownChange(() => {
      extendsMenus.value = getHeaderDropdowns();
    });
    const i18nInstance = useInject('DI.bay.i18n');

    // 切换语言
    const handleLanguageSwitchCommand = (locale: string) => {
      i18nInstance.value.setLocale(locale);

      // WARN: 刷新页面, 目前这种兼容性最好
      window.location.reload();
    };

    onBeforeUnmount(dispose);

    const handleCommand = (name: string) => {
      switch (name) {
        case BuiltinCommands.EXIT:
          bay.logout();
          break;
        case BuiltinCommands.SWITCH_LANGUAGE:
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
          trigger="click"
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
                  <ElDropdown
                    onCommand={handleLanguageSwitchCommand}
                    placement="left-start"
                    v-slots={{
                      dropdown: () => (
                        <ElDropdown.DropdownMenu>
                          {DEFAULT_LANGUAGE_SUPPORTS.map(i => {
                            return (
                              <ElDropdown.DropdownItem key={i.key} command={i.key}>
                                {i.name}
                              </ElDropdown.DropdownItem>
                            );
                          })}
                        </ElDropdown.DropdownMenu>
                      ),
                    }}
                  >
                    {t('bay.switch-language')}
                  </ElDropdown>
                </ElDropdown.DropdownItem>

                {/* 扩展 */}
                {buttons?.map(button => {
                  return (
                    <ElDropdown.DropdownItem key={button.uid} command={button.identifierPath}>
                      <ElIcon>
                        <Icon icon={button.icon ?? ClassificationSquare} />
                      </ElIcon>
                      {t(getMenuI18nKey(button.identifierPath), button.name)}
                    </ElDropdown.DropdownItem>
                  );
                })}
                <ElDropdown.DropdownItem command={BuiltinCommands.EXIT} icon={Signout}>
                  {t('bay.logout')}
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
