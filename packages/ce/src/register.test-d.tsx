/* eslint-disable vue/one-component-per-file */
import { defineComponent, PropType, ref } from 'vue';

import { registerCustomElements } from './register';
import { InferProps, InferEmits, InferRawBindings, CustomElementEmit, CustomElementBindings } from './type-utils';

declare const expectType: <T>(value: T) => void;
declare const v: any;

const Foo = defineComponent({
  props: {
    foo: {
      type: Number,
      required: true,
    },
    bar: {
      type: Object as PropType<{ foo: number; bar: number }>,
      required: true,
    },
    baz: {
      type: String,
      default: '1',
    },
  },
  emits: {
    hello(value: string) {
      return true;
    },
    world(value: number) {
      return true;
    },
  },
  setup() {
    const a = ref(1);
    return { a, b: '2' };
  },
});

const BarBar = defineComponent({
  props: {
    foo: {
      type: Number,
      default: 1,
    },
  },
  emits: {
    hello(value: string, value2: number) {
      return true;
    },
  },
});

type FooProps = InferProps<typeof Foo>;

expectType<{
  baz?: string | undefined;
  readonly foo: number;
  readonly bar: {
    foo: number;
    bar: number;
  };
}>(v as Pick<FooProps, 'foo' | 'bar' | 'baz'>);

type FooEmits = InferEmits<typeof Foo>;
expectType<{
  onHello?: ((value: string) => any) | undefined;
  onWorld?: ((value: number) => any) | undefined;
}>(v as FooEmits);

type FooRawBindings = InferRawBindings<typeof Foo>;

expectType<{ a: number; b: string }>(v as Pick<FooRawBindings, 'a' | 'b'>);
type FooRawBindingsRef = CustomElementBindings<Pick<FooRawBindings, 'a' | 'b'>>;
expectType<number | undefined>((v as FooRawBindingsRef).ref?.value?.a);

type CustomElementEmits = CustomElementEmit<Required<FooEmits>>;
expectType<{
  onHello?: (evt: CustomEvent<[value: string]>) => void;
  onWorld?: (evt: CustomEvent<[value: number]>) => void;
}>(v as CustomElementEmits);

const c = registerCustomElements('foo-', { Foo, BarBar });

// props 类型推断
expectType<number>(c['foo-foo'].foo);
expectType<{ foo: number; bar: number }>(c['foo-foo'].bar);
expectType<string | undefined>(c['foo-foo'].baz);
expectType<number | undefined>(c['foo-bar-bar'].foo);

// emits 类型推断
expectType<((evt: CustomEvent<[value: string]>) => void) | undefined>(c['foo-foo'].onHello);
expectType<((evt: CustomEvent<[value: string, value: number]>) => void) | undefined>(c['foo-bar-bar'].onHello);

// setup bindings 类型推断
expectType<number | undefined>(c['foo-foo'].ref?.value.a);
expectType<string | undefined>(c['foo-foo'].ref?.value.b);

type MyCustomElements = typeof c;

// 注册到 JSX
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends MyCustomElements {}
  }
}

expectType<JSX.Element>(
  <foo-foo
    foo={1}
    bar={{ foo: 1, bar: 2 }}
    // @ts-expect-error
    baz={3}
  />
);
