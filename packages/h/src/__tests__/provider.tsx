/** @jsxImportSource .. */
import { screen, cleanup } from '@testing-library/vue';
import { provide, inject, isVue2 } from '@wakeadmin/demi';

import { declareComponent, declareProps } from '../declareComponent';

import { render, createComponent, trimHTMLComments } from './helper';

afterEach(cleanup);

const KEY = 'key';
const Provider = declareComponent({
  props: declareProps<{ value: string }>(['value']),
  setup(props, { slots }) {
    provide(KEY, props.value);
    return () => slots.default?.();
  },
});

const Consumer = declareComponent({
  setup() {
    const value = inject<string>(KEY);
    return () => <div title="value">{value}</div>;
  },
});

test('provider single child', () => {
  const App = createComponent(() => (
    <Provider value="hello world">
      <Consumer />
    </Provider>
  ));

  render(App, {});

  const value = screen.getByTitle('value');
  expect(value.outerHTML).toBe('<div title="value">hello world</div>');
});

test('provider single child', () => {
  const App = createComponent(() => (
    <div title="app">
      <Provider value="hello world">
        <Consumer />
        <div>split</div>
        <Consumer />
      </Provider>
    </div>
  ));

  render(App, {});

  const app = screen.getByTitle('app');

  if (isVue2) {
    // vue2 不支持 fragment
    expect(trimHTMLComments(app.outerHTML)).toBe('<div title="app"></div>');
  } else {
    // 支持
    expect(trimHTMLComments(app.outerHTML)).toBe(
      '<div title="app"><div title="value">hello world</div><div>split</div><div title="value">hello world</div></div>'
    );
  }
});
