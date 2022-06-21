/** @jsxImportSource .. */
import { screen, fireEvent } from '@testing-library/vue';
import { ref, nextTick } from '@wakeadmin/demi';

import { declareComponent, declareEmits, declareProps } from '../declareComponent';

import { render } from './helper';

const Counter = declareComponent({
  name: 'Counter',
  props: declareProps<{
    initialValue: number;
  }>(['initialValue']),
  emits: declareEmits<{ change: (value: number) => void }>(),
  setup(props, { emit }) {
    const count = ref(props.initialValue);
    const handleClick = () => {
      count.value++;

      emit('change', count.value);
    };

    return () => (
      <div title="count" onClick={handleClick}>
        count: {count.value}
      </div>
    );
  },
});

test('Counter', async () => {
  const handler = jest.fn();
  render(Counter, { initialValue: 4, onChange: handler });

  const count = screen.getByTitle('count');
  expect(count.textContent).toBe('count: 4');

  // 事件调用
  fireEvent(count, new MouseEvent('click'));
  await nextTick();
  expect(count.textContent).toBe('count: 5');
  expect(handler).toBeCalledWith(5);
});
