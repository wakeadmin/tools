/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, ref } from 'vue';
import { registerCustomElement } from './register';

test('props 属性预定义', () => {
  const MyComponent = defineComponent({
    props: ['foo', 'bar'],
  });

  const { name, component: Element } = registerCustomElement('foo', 'Foo', MyComponent);

  expect(name).toBe('foo-foo');

  const instance = new Element();

  expect(instance).toHaveProperty('foo');
  expect(instance).toHaveProperty('bar');
});

function exposeTest(createComponent: (foo: Function, bar: Function) => any) {
  const foo = jest.fn();
  const bar = jest.fn();

  const MyComponent = createComponent(foo, bar);

  const { name } = registerCustomElement('foo', MyComponent.name, MyComponent);

  const instance = document.createElement(name);
  expect(instance).toBeDefined();

  expect('foo' in instance).toBe(true);
  expect('bar' in instance).toBe(true);

  // 挂载后才会开始渲染
  document.body.appendChild(instance);

  // 可以调用到方法
  (instance as any).foo();
  (instance as any).bar();
  expect(foo).toBeCalledWith(1);
  expect(bar).toBeCalledWith(2);
}

test('expose', () => {
  exposeTest((foo, bar) => {
    return defineComponent({
      name: 'Expose',
      expose: ['foo', 'bar'],
      data() {
        return { a: 1, b: 2 };
      },
      methods: {
        foo() {
          foo(this.a);
        },
        bar() {
          bar(this.b);
        },
      },
      render() {
        return h('div', 'hello world');
      },
    });
  });
});

test('customElementExpose', () => {
  exposeTest((foo, bar) => {
    return defineComponent({
      name: 'Expose2',
      customElementExpose: ['foo', 'bar'],
      data() {
        return { a: 1, b: 2 };
      },
      methods: {
        foo() {
          foo(this.a);
        },
        bar() {
          bar(this.b);
        },
      },
      render() {
        return h('div', 'hello world');
      },
    });
  });
});

test('customElementExpose with setup', () => {
  exposeTest((foo, bar) => {
    return defineComponent({
      name: 'Expose3',
      customElementExpose: ['foo', 'bar'],
      setup(_, { expose }) {
        const a = ref(1);
        const b = ref(2);
        expose({
          foo: () => {
            foo(a.value);
          },
          bar: () => {
            bar(b.value);
          },
        });
      },
      render() {
        return h('div', 'hello world');
      },
    });
  });
});

test('customElementExpose with setup return', () => {
  exposeTest((foo, bar) => {
    return defineComponent({
      name: 'Expose4',
      customElementExpose: ['foo', 'bar'],
      setup(_) {
        const a = ref(1);
        const b = ref(2);
        return {
          foo: () => {
            foo(a.value);
          },
          bar: () => {
            bar(b.value);
          },
        };
      },
      render() {
        return h('div', 'hello world');
      },
    });
  });
});
