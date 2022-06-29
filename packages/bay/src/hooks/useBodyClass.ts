import { onBeforeMount, onBeforeUnmount } from 'vue';
/**
 * 添加 class 到 body 中
 * @param className
 */
export function useBodyClass(className: string) {
  onBeforeMount(() => {
    document.body.classList.add(className);
  });

  onBeforeUnmount(() => {
    document.body.classList.remove(className);
  });
}
