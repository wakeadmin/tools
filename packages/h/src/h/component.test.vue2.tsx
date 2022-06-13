/** @jsx h */
import { screen, cleanup } from '@testing-library/vue';

import { h } from '../h';
import { Teleport, Suspense } from './components';

import { render, createComponent } from '../__tests__/helper';

afterEach(cleanup);

test('Teleport、Suspense 不支持', () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  [Teleport, Suspense].forEach(Comp => {
    render(
      createComponent(() => (
        <div title="container">
          {/* @ts-expect-error */}
          <Comp />
        </div>
      )),
      {}
    );

    const text = screen.queryByTitle('container') as HTMLDivElement;
    expect(text.textContent).toMatch(/不支持/);
    cleanup();
  });
});
