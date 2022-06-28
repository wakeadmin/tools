import { render, createComponent } from 'test-helper-vue';
import { screen, fireEvent } from '@testing-library/vue';
import {} from '@wakeadmin/demi';

import { Test } from './Test';

test('图标渲染', () => {
  const handleClick = jest.fn();
  render(
    createComponent(() => {
      return (
        <div title="icon-wrapper">
          <Test
            class="hello"
            color="green"
            size="20px"
            style={{ backgroundColor: 'red' }}
            onClick={handleClick}
            title="icon"
          />
        </div>
      );
    }),
    {}
  );

  const node = screen.getByTitle('icon');
  expect(node).toHaveClass('wk-icon', 'hello');
  expect(node).toHaveStyle({ backgroundColor: 'red', color: 'green', fontSize: '20px' });

  expect(node.innerHTML).toBe(
    `<svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M512 68.256c245.056 0 443.744 198.688 443.744 443.744 0 245.056-198.688 443.744-443.744 443.744-245.056 0-443.744-198.688-443.744-443.744C68.256 266.944 266.944 68.256 512 68.256z m0 64C302.272 132.256 132.256 302.272 132.256 512c0 209.728 170.016 379.744 379.744 379.744 209.728 0 379.744-170.016 379.744-379.744 0-209.728-170.016-379.744-379.744-379.744z m2.144 174.944a32 32 0 0 1 32 32l-0.032 138.656H684.8a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32l-138.688-0.032V684.8a32 32 0 0 1-32 32h-4.256a32 32 0 0 1-32-32v-138.688H339.2a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h138.656V339.2a32 32 0 0 1 32-32h4.288z"></path></svg>`
  );

  fireEvent(node, new MouseEvent('click'));
  expect(handleClick).toBeCalled();
});
