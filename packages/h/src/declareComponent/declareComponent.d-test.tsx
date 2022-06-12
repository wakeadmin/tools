/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
import { VNodeChild, ref } from 'vue-demi';
import {
  withDefaults,
  declareComponent,
  declareProps,
  declareExpose,
  declareSlots,
  declareEmits,
} from './declareComponent';

export declare function expectType<T>(value: T): void;

declare let t: any;

test('withDefaults', () => {
  const props: { foo: string; bar?: string } = { foo: '1' };
  const withDefaultValues1 = withDefaults(props, { bar: '1' });
  expectType<{ foo: string; bar: string }>(withDefaultValues1);

  // @ts-expect-error baz 未定义
  withDefaults(props, { baz: '1' });

  // @ts-expect-error 类型不兼容
  withDefaults(props, { bar: 1 });
});

test('测试 defineComponent 类型推断', () => {
  test('未定义任何声明', () => {
    const Test = declareComponent({
      setup(props, { slots, emit, expose }) {
        expectType<{}>(props);
        expectType<{}>(slots);

        // 可以 emit 任何内容
        emit('event', t);

        // 未限制
        expose({ a: 1 });
      },
    });

    t = <Test></Test>;
  });

  test('emit 定义', () => {
    const Test = declareComponent({
      // 统一使用驼峰式
      emits: declareEmits<{ change: (a: number) => void; clickMe: () => void }>(),
      setup(props, { emit, attrs }) {
        // @ts-expect-error
        emit('change', 'a');
      },
    });

    t = (
      <Test
        // 对 JSX 暴露 onChange 属性
        onChange={a => {
          expectType<number>(a);
        }}
      ></Test>
    );
  });

  test('ref 定义', () => {
    const Test = declareComponent({
      expose: declareExpose<{ a: number }>(),
      setup(props, { expose }) {
        // @ts-expect-error
        expose({ a: 'string' });
        expose({ a: 1 });
      },
    });

    const refTest = ref<{ a: string } | null>(null);
    const refTestCorrect = ref<{ a: number } | null>(null);

    // @ts-expect-error
    t = <Test ref={refTest} />;
    t = <Test ref={refTestCorrect} />;
  });

  test('slot 定义', () => {
    const Test = declareComponent({
      slots: declareSlots<{ default: () => VNodeChild; named: (scope: string) => VNodeChild }>(),
      setup(props, { slots }) {
        expectType<{}>(props);
        expectType<{}>(slots);
      },
    });

    // object 语法
    t = (
      <Test>
        {{
          default: () => {
            return '';
          },
          // @ts-expect-error 不能返回非 VNode
          named: scope => {
            expectType<string>(scope);
            return /x/;
          },
        }}
      </Test>
    );

    // v-slots 语法
    t = (
      <Test
        v-slots={{
          default: () => {
            return '';
          },
          named: scope => {
            expectType<string>(scope);
            return '';
          },
        }}
      />
    );
  });

  test('render function', () => {
    const Test = declareComponent({
      setup() {
        return () => {
          return 'hello';
        };
      },
    });

    const AsyncTest = declareComponent({
      async setup() {
        return () => 'hello';
      },
    });

    console.log(Test, AsyncTest);
  });

  test('完全定义', () => {
    const A = declareComponent({
      name: 'Comp',
      props: declareProps<{ a?: string; b: number }>(['a', 'b']),
      expose: declareExpose<{ hello: string }>(),
      slots: declareSlots<{ default: () => VNodeChild }>(),
      emits: declareEmits<{ change: (data: number) => void }>(),
      setup: (props, { emit, expose, slots }) => {
        expectType<string | undefined>(props.a);
        expectType<number>(props.b);

        emit('change', 100);

        // @ts-expect-error
        emit('change', 'string');

        expose({
          // @ts-expect-error
          hello: 1,
        });

        expectType<(() => VNodeChild) | undefined>(slots.default);

        // @ts-expect-error
        slots.foo();
      },
    });

    // JSX test
    // @ts-expect-error require b
    let a = <A />;
    a = <A b={1}>{{ default: () => 1 }}</A>;
  });
});
