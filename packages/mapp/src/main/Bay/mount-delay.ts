/**
 * 跨路由切换可能导致 single-spa 应用挂载失败。
 * 因为 vue-router 页面还没挂载完毕。因此这里设置一个等待队列
 */

let queue: Function[] = [];
let timeout: number | undefined;

function resetTimeout() {
  if (timeout != null) {
    window.clearTimeout(timeout);
  }

  timeout = window.setTimeout(() => {
    timeout = undefined;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    flushMountQueue();
  }, 2000);
}

export function pushMountQueue(callback: () => void) {
  queue.push(callback);

  // 加上超时，避免 beforeEach 没有触发
  resetTimeout();
}

export function flushMountQueue() {
  let fn: Function | undefined;
  while ((fn = queue.shift())) {
    fn();
  }
}
