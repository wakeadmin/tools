import fs from 'fs';
import path from 'path';
import { fireEvent, screen } from '@testing-library/vue';
import { render, createComponent } from 'test-helper-vue';
import { h } from '@wakeadmin/h';

const list = fs.readdirSync(__dirname).filter(i => i !== 'index.ts' && !i.includes('.test.') && i.endsWith('.tsx'));

list.forEach(item => {
  const name = path.basename(item, '.tsx');
  // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
  const component = require(path.join(__dirname, item))[name];

  test(`${name} 能够正常渲染`, () => {
    const handleClick = jest.fn();
    render(
      createComponent(() =>
        h(component, {
          class: 'hello',
          fill: 'green',
          'data-testid': 'icon',
          style: { backgroundColor: 'red' },
          onClick: handleClick,
        })
      ),
      {}
    );

    const node = screen.getByTestId('icon');
    expect(node).toHaveClass('wk-svg', 'hello');
    expect(node).toHaveStyle({ backgroundColor: 'red' });
    expect(node).toHaveAttribute('fill', 'green');
    expect(node).toHaveAttribute('data-testid', 'icon');

    fireEvent(node, new MouseEvent('click'));
    expect(handleClick).toBeCalled();
  });
});
