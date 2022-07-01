import { Disposer } from '@wakeadmin/utils';
import { onBeforeUnmount } from 'vue';

export function useDisposer() {
  const disposer = new Disposer();

  onBeforeUnmount(disposer.release);

  return disposer;
}
