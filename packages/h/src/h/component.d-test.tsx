/** @jsxImportSource .. */
import { KeepAlive, Transition, TransitionGroup } from './components';

test('类型检查', () => {
  <KeepAlive include={['1']} />;
  // @ts-expect-error
  <KeepAlive max={true} />;
  <KeepAlive key={1} />;
  <Transition key={1} name="hello"></Transition>;
  // @ts-expect-error
  <Transition name={1}></Transition>;
  <TransitionGroup name="hello" />;
});
