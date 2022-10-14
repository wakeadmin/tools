/** @jsxImportSource .. */
import { KeepAlive, Transition, TransitionGroup } from './components';

test('类型检查', () => {
  <KeepAlive include={['1']} />;
  // @ts-expect-error
  <KeepAlive max="string" />;
  <Transition name="hello"></Transition>;
  // @ts-expect-error
  <Transition name={1}></Transition>;
  <TransitionGroup name="hello" />;
});
