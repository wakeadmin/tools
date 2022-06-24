/* eslint-disable vue/one-component-per-file */
import { cleanup } from '@testing-library/vue';
import { h, watch as vueWatch, defineComponent, ref, nextTick } from '@wakeadmin/demi';
import { render } from 'test-helper-vue';

import { watch } from './watch';

afterEach(cleanup);

test('vue 默认行为', async () => {
  let count = ref(0);
  let countDep = -1;

  const App = defineComponent({
    setup() {
      vueWatch(
        count,
        v => {
          countDep = v;
        },
        { immediate: true }
      );
      return () => h('div');
    },
  });

  const { unmount } = render(App, {});
  expect(countDep).toBe(0);

  count.value++;
  await nextTick();
  expect(countDep).toBe(1);

  unmount();

  // 不再响应
  count.value++;
  await nextTick();
  expect(countDep).toBe(1);
});

test('detached watch', async () => {
  let count = ref(0);
  let countDep = -1;
  let stop: Function | undefined;

  const App = defineComponent({
    setup() {
      stop = watch(
        count,
        v => {
          countDep = v;
        },
        { immediate: true }
      );
      return () => h('div');
    },
  });

  const { unmount } = render(App, {});
  expect(countDep).toBe(0);

  count.value++;
  await nextTick();
  expect(countDep).toBe(1);

  unmount();

  // 继续响应
  count.value++;
  await nextTick();
  expect(countDep).toBe(2);

  stop?.();

  // 不再响应
  count.value++;
  await nextTick();
  expect(countDep).toBe(2);
});
