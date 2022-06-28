/** @jsxImportSource .. */

import { isVue2, toRefs, reactive, isReactive, watchEffect } from '@wakeadmin/demi';
import { screen, fireEvent } from '@testing-library/vue';
import { render } from '../__tests__/helper';

import { declareComponent, declareProps, declareEmits, declareExpose, declareSlots } from './declareComponent';
import { withDefaults, fallthrough } from './helper';

test('declareProps', () => {
  expect(declareProps<{ foo: string; bar: string }>(['foo', 'bar'])).toEqual(['foo', 'bar']);
});

test('declareEmits', () => {
  expect(declareEmits<{ click: () => void }>()).toEqual(undefined);
});

test('declareExpose', () => {
  expect(declareExpose<{ a: string }>()).toEqual(undefined);
});

test('declareSlots', () => {
  expect(declareSlots<{ a: any }>()).toEqual(undefined);
});

describe('withDefaults', () => {
  test('如果是非 reactive 对象则抛出异常', () => {
    expect(() => {
      withDefaults({}, {});
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      withDefaults([], {});
    }).toThrowError();
  });

  test('withDefaultValue', () => {
    const value = reactive<{ foo: string; bar?: string }>({ foo: 'bar' });
    const withDefaultValue = withDefaults(value, { bar: 'baz' });

    // 依旧还是 reactive
    expect(isReactive(withDefaultValue)).toBe(true);

    expect(Object.keys(withDefaultValue)).toEqual(['foo', 'bar']);

    // 保持响应性
    let bar: any;
    watchEffect(
      () => {
        bar = withDefaultValue.bar;
      },
      {
        flush: 'sync',
      }
    );

    // toRefs 兼容, 依赖于 ownKeys
    const refs = toRefs(withDefaultValue);

    expect(withDefaultValue.bar).toBe('baz');
    expect(bar).toBe('baz');
    expect(refs.bar.value).toBe('baz');

    // vue2 在这里不会响应, 需要 set
    value.bar = 'new bar';

    expect(withDefaultValue.bar).toBe('new bar');
    expect(bar).toBe('new bar');
    expect(refs.bar.value).toBe('new bar');

    // 恢复默认
    value.bar = undefined;
    expect(withDefaultValue.bar).toBe('baz');
    expect(bar).toBe('baz');
    expect(refs.bar.value).toBe('baz');
  });
});

describe('fallthrough', () => {
  test('host component fallthrough', () => {
    const Component1 = declareComponent({
      setup(props, context) {
        return () => fallthrough('div', props, context);
      },
    });
    const handleClick = jest.fn();
    render(Component1, { onClick: handleClick, title: 'host', class: 'host', style: { color: 'red' } }, 'hello world');

    const node = screen.getByTitle('host');

    expect(node).toHaveClass('host');
    expect(node.innerHTML).toBe('hello world');

    fireEvent(node, new MouseEvent('click'));
    expect(handleClick).toBeCalled();
  });

  test('component fallthrough', () => {
    const Component1 = declareComponent({
      props: declareProps<{ foo: string; bar: number }>(['foo', 'bar']),
      emits: declareEmits<{ click: () => void }>(),
      slots: declareSlots<{ header: never; default: number }>(),
      setup(props, context) {
        return () => {
          return (
            <div
              class={['my-component', context.attrs.class]}
              title="my-component"
              style={context.attrs.style}
              onClick={() => context.emit('click')}
            >
              <header>{context.slots.header?.()}</header>
              {context.slots.default?.()}
              <div>
                foo: {props.foo} bar: {props.bar}
              </div>
            </div>
          );
        };
      },
    });

    const Component2 = declareComponent({
      setup(props, context) {
        return () => fallthrough(Component1, props, context);
      },
    });
    const handleClick = jest.fn();
    render(
      Component2,
      { onClick: handleClick, title: 'host', class: 'host', style: { color: 'red' }, foo: 'foo', bar: 1 },
      {
        header: () => <div>my header</div>,
        default: () => <div>my default</div>,
      }
    );

    const node = screen.getByTitle('my-component');

    expect(node.outerHTML).toBe(
      '<div class="my-component host" title="my-component" style="color: red;"><header><div>my header</div></header><div>my default</div><div>foo: foo bar: 1</div></div>'
    );

    fireEvent(node, new MouseEvent('click'));
    expect(handleClick).toBeCalled();
  });
});

describe('defineComponent', () => {
  test('不定义 emits 也能正常调用', () => {
    let context: any;
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    const handler4 = jest.fn();
    const handler5 = jest.fn();
    const handler6 = jest.fn();
    const handler7 = jest.fn();

    const App = declareComponent({
      setup(props, _context) {
        context = _context;

        return () => null;
      },
    });

    render(App, {
      onClick: handler1,
      'onUpdate:value': handler2,
      'onUpdate:modelValue': handler3,
      // kebab-case 也能被调用
      'onUpdate:model-another-value': handler4,
      onClickMe: handler5,
      // kebab-case 也能被调用
      'onClick-you': handler6,
      'onClick:Hello:World': handler7,
    });

    expect(Object.keys(context.attrs)).toEqual(
      isVue2
        ? []
        : [
            'onClick',
            'onUpdate:value',
            'onUpdate:modelValue',
            'onUpdate:model-another-value',
            'onClickMe',
            'onClick-you',
            'onClick:Hello:World',
          ]
    );

    context.emit('click');
    expect(handler1).toHaveBeenCalled();

    context.emit('update:value');
    expect(handler2).toHaveBeenCalled();

    context.emit('update:modelValue');
    expect(handler3).toHaveBeenCalled();

    context.emit('update:modelAnotherValue');
    expect(handler4).toHaveBeenCalled();

    context.emit('clickMe');
    expect(handler5).toHaveBeenCalled();

    expect(() => {
      context.emit('click-me');
    }).toThrowError();

    context.emit('clickYou');
    expect(handler6).toBeCalled();

    context.emit('click:Hello:World');
    expect(handler7).toBeCalled();
  });

  test('定义驼峰式 emits', () => {
    let context: any;
    const App = declareComponent({
      emits: declareEmits<{
        click: () => void;
        clickMe: () => void;
        'update:value': () => void;
        clickYou: () => void;
        'update:modelValue': () => void;
        'update:model:value': () => void;
      }>(),
      setup(_, _context) {
        context = _context;
        return () => null;
      },
    });

    const h1 = jest.fn();
    const h2 = jest.fn();
    const h3 = jest.fn();
    const h4 = jest.fn();
    const h5 = jest.fn();
    const h6 = jest.fn();

    render(App, {
      onClick: h1,
      onClickMe: h2,
      'onUpdate:value': h3,
      'onClick-you': h4,
      'onUpdate:model-value': h5,
      'onUpdate:model:value': h6,
    });

    expect(context).toBeDefined();
    context.emit('click');

    expect(h1).toBeCalled();

    context.emit('clickMe');
    expect(h2).toBeCalled();

    context.emit('update:value');
    expect(h3).toBeCalled();

    context.emit('clickYou');
    expect(h4).toBeCalled();

    context.emit('update:modelValue');
    expect(h5).toBeCalled();

    context.emit('update:model:value');
    expect(h6).toBeCalled();
  });
});
