import { useInject } from '@wakeadmin/framework';
import { unref } from 'vue';

export function useBayModel() {
  return unref(useInject('DI.bay.BayModel'));
}
