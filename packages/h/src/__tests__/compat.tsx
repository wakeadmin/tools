/** @jsxImportSource .. */
import { screen, cleanup } from '@testing-library/vue';
import { defineComponent, PropType } from '@wakeadmin/demi';

import { declareComponent } from '../declareComponent';

import { render, expectType, createComponent, trimHTMLComments } from './helper';

afterEach(cleanup);

test('class style 兼容', async () => {
  const App = declareComponent({
    setup(_, { attrs }) {
      // Vue3 下需要显式设置
      return () => (
        <div
          title="content"
          class={[attrs.class, 'content']}
          style={[attrs.style!, { 'background-color': 'red' }]}
        ></div>
      );
    },
  });

  const { rerender } = render(App, { class: 'hello', style: { color: 'red' } });

  const content = screen.getByTitle('content');
  expect(content).toHaveClass('hello', 'content');
  expect(content).toHaveStyle({ color: 'red', backgroundColor: 'red' });

  // 清空
  await rerender({ class: undefined, style: null });
  expect(content).toHaveClass('content');
  expect(content).toHaveStyle({ backgroundColor: 'red' });
});

test('trimHTMLComments', () => {
  expect(
    trimHTMLComments(
      '<div title="app"><div>(b:before)(d:default)(a:<!---->)</div><div>(b:<!---->)(d:default)(a:after)</div><div>(b:before)(d:default)(a:after)</div></div>'
    )
  ).toBe(
    '<div title="app"><div>(b:before)(d:default)(a:)</div><div>(b:)(d:default)(a:after)</div><div>(b:before)(d:default)(a:after)</div></div>'
  );
});

test('元素自定义组件兼容', () => {
  // 原生组件无法声明 slot、expose 的类型
  const Native = defineComponent({
    props: {
      foo: {
        type: String,
        required: true,
      },
      bar: {
        type: Number,
        default: 1,
      },
      baz: {
        type: Object as PropType<{ foo: string }>,
        default: () => ({ foo: '1' }),
      },
    },
    emits: { foo: (event: number) => true, bar: (evt: string) => true },
    setup(props, { emit, slots }) {
      expectType<((event: 'foo', args: number) => void) & ((event: 'bar', arg: string) => void)>(emit);
      expectType<number>(props.bar);
      expectType<{ foo: string }>(props.baz);

      return () => (
        <div>
          (b:{slots.before?.()})(d:{slots.default?.()})(a:{slots.after?.()})
        </div>
      );
    },
  });

  const App = createComponent(() => {
    // @ts-expect-error 需要传入 foo
    let t: any = <Native></Native>;

    // @ts-expect-error bar 类型错误
    t = <Native foo="foo" bar="1"></Native>;

    t = <Native foo="foo" bar={1} baz={{ foo: 'foo' }}></Native>;

    t = <Native foo="foo" onFoo={evt => expectType<number>(evt)} onBar={evt => expectType<string>(evt)}></Native>;

    // v-slots 语法支持
    return (
      <div title="app">
        <Native foo="foo" v-slots={{ before: () => 'before', default: () => 'default' }}></Native>
        <Native foo="foo">{{ default: () => 'default', after: () => 'after' }}</Native>
        <Native foo="foo" v-slots={{ before: () => 'before', after: () => 'after' }}>
          default
        </Native>
      </div>
    );
  });

  render(App, {});

  const app = screen.getByTitle('app');
  expect(trimHTMLComments(app.outerHTML)).toBe(
    '<div title="app"><div>(b:before)(d:default)(a:)</div><div>(b:)(d:default)(a:after)</div><div>(b:before)(d:default)(a:after)</div></div>'
  );
});
