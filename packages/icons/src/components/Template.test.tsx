import { render, createComponent } from 'test-helper-vue';
import { screen, fireEvent } from '@testing-library/vue';
import {} from '@wakeadmin/demi';

import { Template } from './Template';

test('图标渲染', () => {
  const handleClick = jest.fn();
  render(
    createComponent(() => {
      return (
        <div title="icon-wrapper">
          <Template
            class="hello"
            fill="green"
            data-test="test"
            style={{ backgroundColor: 'red' }}
            onClick={handleClick}
          />
        </div>
      );
    }),
    {}
  );

  const node = screen.getByTitle('icon-wrapper').firstElementChild!;
  expect(node).toHaveClass('wk-svg', 'hello');
  expect(node).toHaveStyle({ backgroundColor: 'red' });
  expect(node).toHaveAttribute('fill', 'green');
  expect(node).toHaveAttribute('data-test', 'test');

  expect(node.innerHTML).toBe(
    `<path fill="currentColor" d="M512 68.256c245.056 0 443.744 198.688 443.744 443.744 0 245.056-198.688 443.744-443.744 443.744-245.056 0-443.744-198.688-443.744-443.744C68.256 266.944 266.944 68.256 512 68.256z m0 64C302.272 132.256 132.256 302.272 132.256 512c0 209.728 170.016 379.744 379.744 379.744 209.728 0 379.744-170.016 379.744-379.744 0-209.728-170.016-379.744-379.744-379.744z m2.144 174.944a32 32 0 0 1 32 32l-0.032 138.656H684.8a32 32 0 0 1 32 32v4.288a32 32 0 0 1-32 32l-138.688-0.032V684.8a32 32 0 0 1-32 32h-4.256a32 32 0 0 1-32-32v-138.688H339.2a32 32 0 0 1-32-32v-4.256a32 32 0 0 1 32-32h138.656V339.2a32 32 0 0 1 32-32h4.288z"></path>`
  );

  fireEvent(node, new MouseEvent('click'));
  expect(handleClick).toBeCalled();
});
