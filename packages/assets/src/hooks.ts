import { onBeforeUnmount, Ref, ref } from '@wakeadmin/demi';
import { getAsset, listenAssets } from './assets';

/**
 * 获取静态资源，响应式版本
 * @param key
 * @param fallback
 */
export function useAsset(key: keyof MappAssetKey, fallback: string): Ref<string>;
export function useAsset(key: string, fallback: string): Ref<string>;
export function useAsset(key: string, fallback: string): Ref<string> {
  const result = ref(getAsset(key, fallback));

  const disposer = listenAssets(() => {
    result.value = getAsset(key, fallback);
  });

  onBeforeUnmount(disposer);

  return result;
}
