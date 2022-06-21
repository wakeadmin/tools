/** @jsxImportSource .. */
import { ref, nextTick } from '@wakeadmin/demi';
import { screen, fireEvent } from '@testing-library/vue';

import { declareComponent, declareEmits, declareProps } from '../declareComponent';
import { withDirectives } from '../h';

import { render } from './helper';

const CustomModel = declareComponent({
  props: declareProps<{ modelValue?: string }>(['modelValue']),
  emits: declareEmits<{ 'update:modelValue': (value?: string) => void }>(),
  setup(props, { emit }) {
    return () => (
      <input
        title="customInput"
        value={props.modelValue}
        onInput={e => emit('update:modelValue', (e.target as any).value)}
      />
    );
  },
});

const App = declareComponent({
  setup() {
    const visible = ref(false);
    const inputValue = ref('hello');
    const customInputValue = ref<string | undefined>('hello');

    const toggle = () => (visible.value = !visible.value);

    return () => (
      <div>
        {/* v-html 使用 innerHTML, 注意对自定义组件无效 */}
        <div title="innerHTML" innerHTML={'<div class="inner">innerHTML</div>'}></div>
        {/* v-text 使用 textContent */}
        <div title="textContent" textContent="textContent"></div>

        {/* v-model, Vue2 JSX 的类型信息非常不完善 */}
        <input title="input" value={inputValue.value} onInput={e => (inputValue.value = (e.target as any).value)} />
        <span title="inputValue">{inputValue.value}</span>

        {/* custom v-model */}
        {/* 注意，在 babel 下，默认不支持 onUpdate:modelValue 这种带命名空间的形式，需要设置 throwIfNamespace: false  */}
        <CustomModel modelValue={customInputValue.value} onUpdate:modelValue={e => (customInputValue.value = e)} />
        <span title="customInputValue">{customInputValue.value}</span>

        {/* v-show */}
        <span title="content" {...withDirectives([['show', visible.value]])}>
          show
        </span>
        <button title="button" onClick={toggle}>
          toggle
        </button>

        {/* v-for */}
        <div title="list">
          {[1, 2, 3].map(i => (
            <div key={i}>{i}</div>
          ))}
        </div>
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
  const input = screen.getByTitle('input') as HTMLInputElement;
  const inputValue = screen.getByTitle('inputValue');
  const customInput = screen.getByTitle('customInput') as HTMLInputElement;
  const customInputValue = screen.getByTitle('customInputValue');
  const list = screen.getByTitle('list');

  // v-html
  expect(innerHTML.innerHTML).toBe('<div class="inner">innerHTML</div>');

  // v-text
  expect(textContent.innerHTML).toBe('textContent');

  // v-model on input
  expect(input.value).toBe('hello');
  expect(inputValue.textContent).toBe('hello');
  fireEvent.update(input, 'world');
  await nextTick();
  expect(input.value).toBe('world');
  expect(inputValue.textContent).toBe('world');

  // v-model on Custom Component
  expect(customInput.value).toBe('hello');
  expect(customInputValue.textContent).toBe('hello');
  fireEvent.update(customInput, 'world');
  await nextTick();
  expect(customInput.value).toBe('world');
  expect(customInputValue.textContent).toBe('world');

  // v-show
  // display none
  expect(content.outerHTML).toBe('<span title="content" style="display: none;">show</span>');

  fireEvent(button, new MouseEvent('click'));
  await nextTick();
  expect(content.outerHTML).toBe('<span title="content" style="">show</span>');

  // v-for
  expect(list.outerHTML).toBe('<div title="list"><div>1</div><div>2</div><div>3</div></div>');
});
