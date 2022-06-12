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

  // display none
  expect(content.outerHTML).toBe('<span title="content" style="display: none;">show</span>');

  fireEvent(button, new MouseEvent('click'));
  await nextTick();
  expect(content.outerHTML).toBe('<span title="content" style="">show</span>');
});
