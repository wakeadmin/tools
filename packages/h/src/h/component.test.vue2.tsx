/** @jsxImportSource .. */
import { screen, cleanup } from '@testing-library/vue';

import { Teleport, Suspense } from './components';

import { render, createComponent } from '../__tests__/helper';

afterEach(cleanup);

test('Teleport、Suspense 不支持', () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  [Teleport, Suspense].forEach(Comp => {
    render(
      createComponent(() => (
        <div title="container" onClick={evt => console.log(evt)}>
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
