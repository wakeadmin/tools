import { render } from 'testing-library-vue-2';
import { getCurrentInstance } from 'vue-demi';

import { declareComponent, declareExpose } from './defineComponent';

describe('defineComponent', () => {
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
