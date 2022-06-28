import { defineComponent, unref } from 'vue';
import { useInject } from '@wakeadmin/framework';

import { Menus } from './Menus';
import './index.scss';

export const Header = defineComponent({
  name: 'Header',
  setup: async () => {
    const bay = unref(useInject('DI.bay.BayModel'));

    await bay.setup();

    return () => (
      <div class="bay-header">
        <div class="bay-header__logo">logo</div>
        <Menus bay={bay} />
        <div class="bay-header__dropdown">dropdown</div>
      </div>
    );
  },
});
