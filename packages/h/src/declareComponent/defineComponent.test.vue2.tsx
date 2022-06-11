import { render } from 'testing-library-vue-2';
import { nextTick, getCurrentInstance } from 'vue-demi';

import { declareComponent, declareExpose, declareProps } from './defineComponent';
import { h } from '../h';

describe('defineComponent', () => {
  test('merge $listeners', async () => {
    let context: any;
    const handler = jest.fn();

    const Foo = declareComponent({
      setup(_props, _context) {
        context = _context;

        return () => null;
      },
    });

    const App = declareComponent({
      props: declareProps<{ addListener: boolean }>(['addListener']),
      setup(props) {
        return () => {
          return h(Foo, {
            onClick: props.addListener ? handler : undefined,
            onClickMe: handler,
            'onUpdate:value': handler,
          });
        };
      },
    });

    const result = render(App, {
      props: {
        addListener: true,
      },
    });

    expect(Object.keys(context.attrs)).toEqual(['onClick', 'onClickMe', 'onUpdate:value']);
    context.attrs.onClick();
    expect(handler).toBeCalled();

    result.updateProps({ addListener: false });
    await nextTick();

    expect(Object.keys(context.attrs)).toEqual(['onClickMe', 'onUpdate:value']);
  });

  test('expose', () => {
    let instance: any;
    const App = declareComponent({
      expose: declareExpose<{ a: number; b: string }>(),
      setup(props, context) {
        context.expose({ a: 1, b: 'b' });
        instance = getCurrentInstance();

        return () => null;
      },
    });

    render(App);
    expect(instance).toMatchObject({ a: 1, b: 'b' });
  });
});
