import { useAsset } from '@wakeadmin/assets';
import { defineComponent, useSlots } from 'vue';

import DEFAULT_LOADING from './loading.gif';

export const AppLoading = defineComponent(() => {
  const loadingImg = useAsset('IMG_BAY_APP_LOADING', DEFAULT_LOADING);
  const slots = useSlots();

  return () => (
    <div class="bay-app-loading">
      <img class="bay-app-loading__img" src={loadingImg.value} alt="loading" />
      {!!slots.default && <div class="bay-app-loading__desc">{slots.default()}</div>}
    </div>
  );
});
