import { defineComponent } from 'vue';
import { MenuFold, MenuUnfold } from '@wakeadmin/icons';
import { useBayModel } from '@/hooks';

export const MenuCollaspe = defineComponent({
  name: 'MenuCollaspe',
  setup: () => {
    const bay = useBayModel();

    return () => {
      return (
        <div class="bay-header__collapse" onClick={bay.toggleSidebar} title="折叠">
          {bay.sidebarCollasped ? <MenuUnfold /> : <MenuFold />}
        </div>
      );
    };
  },
});
