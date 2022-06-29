/** @jsxImportSource .. */
import { isVue2 } from '@wakeadmin/demi';
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

if (!isVue2) {
  test('fragment', () => {
    render(
      createComponent(() => {
        return (
          <div title="container">
            <>
              hello
              <span>world</span>
              <i>!</i>
            </>
          </div>
        );
      }),
      {}
    );

    expect(screen.getByTitle('container').outerHTML).toBe(
      '<div title="container">hello<span>world</span><i>!</i></div>'
    );
  });
}
