import { defineComponent } from 'vue';
import { MenuFold, MenuUnfold } from '@wakeadmin/icons';
import { useBayModel } from '@/hooks';
import { useI18n } from 'vue-i18n';

export const MenuCollaspe = defineComponent({
  name: 'MenuCollaspe',
  setup: () => {
    const bay = useBayModel();
    const { t } = useI18n();

    return () => {
      return (
        <div class="bay-header__collapse" onClick={bay.toggleSidebar} title={t('bay.menuCollapse')}>
          {bay.sidebarCollasped ? <MenuUnfold /> : <MenuFold />}
        </div>
      );
    };
  },
});
