/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
import { VNodeChild, ref } from 'vue-demi';
import { declareComponent, declareProps, declareExpose, declareSlots, declareEmits } from './defineComponent';

export declare function expectType<T>(value: T): void;

declare let t: any;

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
      emits: declareEmits<{ change: (a: number) => void }>(['change']),
      setup(props, { emit, attrs }) {
        // @ts-expect-error
        emit('change', 'a');

        // emit 也会放入 attrs 中
        expectType<((a: number) => void) | undefined>(attrs.onChange);
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
      emits: declareEmits<{ change: (data: number) => void }>(['change']),
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
