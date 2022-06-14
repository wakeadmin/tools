/* eslint-disable no-magic-numbers */
/** @jsx h */
import { cleanup } from '@testing-library/vue';
import { ref } from 'vue-demi';

import { h } from '../h';
import { declareComponent, declareExpose, ExtraArrayRef, ExtraRef } from '../declareComponent';

import { render } from './helper';

afterEach(cleanup);

const Ref = declareComponent({
  name: 'Ref',
  expose: declareExpose<{ a: number; b: () => number; refValue: number }>(),
  setup(_, { expose }) {
    const refValue = ref(1);
    expose({ a: 1, b: () => 1, refValue });
    return () => <div></div>;
  },
});

test('expose', async () => {
  const instanceRef = ref<ExtraRef<typeof Ref>>(null);

  const App = declareComponent({
    setup() {
      return () => (
        <div>
          <Ref ref={instanceRef} />
        </div>
      );
    },
  });

  const { rerender } = render(App, {});

  const assertions = () => {
    expect(instanceRef.value).toBeTruthy();
    expect(instanceRef.value?.a).toBe(1);
    expect(instanceRef.value?.b?.()).toBe(1);
    expect(instanceRef.value?.refValue).toEqual(1);
  };

  assertions();

  // 重新渲染也能获取到值
  rerender({});

  assertions();
});

test('expose v-for', () => {
  const instanceRef = ref<ExtraArrayRef<typeof Ref>>(null);

  const App = declareComponent({
    setup() {
      return () => {
        return (
          <div>
            {Array(3)
              .fill(0)
              .map((_, idx) => {
                return <Ref key={`${idx}__`} ref={instanceRef} ref_for />;
              })}
          </div>
        );
      };
    },
  });

  const { rerender } = render(App, {});

  const assertions = () => {
    expect(instanceRef.value).toBeTruthy();
    expect(instanceRef.value?.length).toBe(3);

    expect(instanceRef.value?.[0].a).toBe(1);
    expect(instanceRef.value?.[0].b?.()).toBe(1);
    expect(instanceRef.value?.[0].refValue).toEqual(1);
  };

  assertions();
  rerender({});
  assertions();
});
