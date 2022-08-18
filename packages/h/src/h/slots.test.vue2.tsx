/** @jsxImportSource .. */
import { cleanup } from '@testing-library/vue';
import { defineComponent } from '@wakeadmin/demi';

import { render } from '../__tests__/helper';

const LegacyComponent = defineComponent({
  render() {
    return (
      <div class="legacy-component">
        <header>{this.$slots.header}</header>
        <main>{this.$slots.default}</main>
      </div>
    );
  },
});

afterEach(cleanup);

test('vue 2 legacy slots 测试', () => {
  const { container } = render(
    {
      render() {
        return (
          <LegacyComponent v-slots={{ header: <div>on header</div> }}>
            <div>hello</div>
            <div>world</div>
          </LegacyComponent>
        );
      },
    },
    {}
  );

  expect(container.querySelector('.legacy-component')?.outerHTML).toBe(
    '<div class="legacy-component"><header><div>on header</div></header><main><div>hello</div><div>world</div></main></div>'
  );
});
