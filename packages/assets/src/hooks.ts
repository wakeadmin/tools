import { onBeforeUnmount, Ref, ref, unref, computed } from '@wakeadmin/demi';
import { getAsset, listenAssets } from './assets';

export type MaybeRef<T> = T | Ref<T>;

/**
 * 获取静态资源，响应式版本
 * @param key
 * @param fallback
 */
export function useAsset(key: MaybeRef<keyof MappAssetKey>, fallback: MaybeRef<string>): Ref<string>;
export function useAsset(key: MaybeRef<string>, fallback: MaybeRef<string>): Ref<string>;
export function useAsset(key: MaybeRef<string>, fallback: MaybeRef<string>): Ref<string> {
  const forceUpdate = ref(0);

  const result = computed(() => {
    // do nothing, 只是用于监听并更新
    unref(forceUpdate);

    return getAsset(unref(key), unref(fallback));
  });

  const disposer = listenAssets(() => {
    forceUpdate.value++;
  });

  onBeforeUnmount(disposer);

  return result;
}
