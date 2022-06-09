/* eslint-disable @typescript-eslint/no-namespace */
import Demo from './demo.vue';
import Foo from './Foo';

const test1 = (
  <Demo foo="" onClick={() => {}}>
    {{ fuck: scope => {} }}
  </Demo>
);

const test2 = (
  <Foo foo="" bar={{}} onClickCapture={x}>
    {{ foo: '' }}
  </Foo>
);

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      children: {}; // specify children name to use
    }
  }
}
