/** @jsxImportSource .. */
import { createComponent, render } from './helper';
import { screen } from '@testing-library/vue';

test('jsx-runtime', () => {
  render(
    createComponent(() => {
      return (
        <div title="container">
          hello
          <span>world</span>
          <i>!</i>
        </div>
      );
    }),
    {}
  );

  expect(screen.getByTitle('container').outerHTML).toBe('<div title="container">hello<span>world</span><i>!</i></div>');
});
