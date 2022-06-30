import { defineComponent, unref } from 'vue';
import { useInject } from '@wakeadmin/framework';

import { Menus } from './Menus';
import './index.scss';
import { MenuCollaspe } from './MenuCollaspe';

import DEFAULT_LOGO from './logo-default.png';
import { DropdownMenus } from './DropdownMenus';
import { useAsset } from '@/hooks';

export const Header = defineComponent({
  name: 'BayHeader',
  async setup() {
    const bay = unref(useInject('DI.bay.BayModel'));

    await bay.setup();

    const handleClickLogo = () => {
      bay.openMain();
    };

    const defaultLogo = useAsset('IMG_BAY_LOGO', DEFAULT_LOGO);

    return () => {
      const name = bay.sessionInfo?.appInfo.appName;

      return (
        <header class="bay-header">
          <div class="bay-header__before">
            <MenuCollaspe />
            <div class="bay-header__logo" title={name} onClick={handleClickLogo}>
              <img
                class="bay-header__logo-img"
                src={bay.sessionInfo?.appInfo.appImage ?? defaultLogo.value}
                alt="logo"
              />
              <span class="bay-header__logo-name">{name}</span>
            </div>
          </div>
          <Menus bay={bay} />
          <DropdownMenus />
        </header>
      );
    };
  },
});
