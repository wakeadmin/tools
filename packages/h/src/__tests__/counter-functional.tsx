/** @jsxImportSource .. */
import { screen, fireEvent } from '@testing-library/vue';
import { ref, nextTick } from '@wakeadmin/demi';

import { DefineComponentContext, declareComponent } from '../declareComponent';

import { render } from './helper';

const Counter = declareComponent(
  (
    props: { initialValue: number },
    {
      emit,
    }: DefineComponentContext<{
      change: (value: number) => void;
    }>
  ) => {
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
  {
    name: 'Counter',
    props: ['initialValue'],
  }
);

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
