// @ts-nocheck
/** @jsxImportSource .. */
import { defineComponent, onMounted, nextTick, isVue2, Vue2 } from '@wakeadmin/demi';
import { plugin } from '../plugin';

import { createComponent, render } from './helper';

const MyCustomComponent = defineComponent({
  setup(_props, ctx) {
    onMounted(() => {
      ctx.emit('hello-world', 'hello');
      ctx.emit('helloWorld', 'world');
    });

    return () => {
      return <div></div>;
    };
  },
});

// 不管是 vue2 还是 vue3 在 JSX 使用时，建议统一使用 camelCase
describe('支持两种 case 事件名称', () => {
  const fn = jest.fn();

  if (isVue2) {
    beforeAll(() => {
      Vue2.use(plugin);
    });
  }

  afterEach(() => {
    fn.mockClear();
  });

  test('camelCase', async () => {
    const App = createComponent(() => {
      return <MyCustomComponent onHelloWorld={fn} />;
    });

    render(App, {});

    await nextTick();

    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith('hello');
    expect(fn).toBeCalledWith('world');
  });

  test('kebab-case', async () => {
    const App = createComponent(() => {
      return <MyCustomComponent onHello-world={fn} />;
    });

    render(App, {});

    await nextTick();

    if (isVue2) {
      expect(fn).toBeCalledTimes(2);
      expect(fn).toBeCalledWith('hello');
      expect(fn).toBeCalledWith('world');
    } else {
      // Vue3 template 使用时 kebab-case 会自动转换为 camelCase
      expect(fn).toBeCalledTimes(1);
      expect(fn).toBeCalledWith('hello');
    }
  });
});
