/** @jsx h */
import { ref, nextTick } from 'vue-demi';
import { screen, fireEvent } from '@testing-library/vue';

import { declareComponent } from '../declareComponent';
import { h, withDirectives } from '../h';

import { render } from './helper';

const App = declareComponent({
  setup() {
    const visible = ref(false);

    const toggle = () => (visible.value = !visible.value);

    return () => (
      <div>
        {/* v-html 使用 innerHTML, 注意对自定义组件无效 */}
        <div title="innerHTML" innerHTML={'<div class="inner">innerHTML</div>'}></div>
        {/* v-text 使用 textContent */}
        <div title="textContent" textContent="textContent"></div>

        <span title="content" {...withDirectives([['show', visible.value]])}>
          show
        </span>
        <button title="button" onClick={toggle}>
          toggle
        </button>
      </div>
    );
  },
});

test('Directive', async () => {
  render(App, {});

  const button = screen.getByTitle('button');
  const content = screen.getByTitle('content');
  const innerHTML = screen.getByTitle('innerHTML');
  const textContent = screen.getByTitle('textContent');

  // v-html
  expect(innerHTML.innerHTML).toBe('<div class="inner">innerHTML</div>');

  // v-text
  expect(textContent.innerHTML).toBe('textContent');

  // display none
  expect(content.outerHTML).toBe('<span title="content" style="display: none;">show</span>');

  fireEvent(button, new MouseEvent('click'));
  await nextTick();
  expect(content.outerHTML).toBe('<span title="content" style="">show</span>');
});
