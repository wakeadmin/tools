/** @jsx h */
import { screen, cleanup } from '@testing-library/vue';
import { isVue2 } from '@wakeadmin/demi';

import { h, Transition } from '../h';

import { render, createComponent } from './helper';

afterEach(cleanup);

test('transition', () => {
  const App = createComponent(() => {
    return (
      <div title="container">
        <Transition enterFromClass="enter-from" leaveFromClass="leave-from" appear>
          <div>hello</div>
        </Transition>
      </div>
    );
  });

  render(App, {});
  const container = screen.getByTitle('container');
  expect(container.outerHTML).toBe(
    isVue2
      ? '<div title="container"><transition-stub appear="true" enterclass="enter-from" leaveclass="leave-from"><div>hello</div></transition-stub></div>'
      : '<div title="container"><transition-stub><div>hello</div></transition-stub></div>'
  );
});
