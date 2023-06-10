<!-- eslint-disable no-use-before-define -->
<template>
  <!-- 报错, 需要传 a -->
  <!-- @vue-expect-error -->
  <Foo />

  <!-- 报错 -->
  <!-- @vue-expect-error -->
  <Foo :a="count" :b="1" />

  <!-- 推断 emit -->
  <Foo :a="1" @change="exactType($event, stringType)" />

  <!-- 推断 slot-->
  <Foo :a="1">
    <template #foo="scope">{{ exactType(scope, scopeType) }} </template>
  </Foo>

  <Foo ref="fooRef" :a="1" />

  <RawGeneric
    :list="[1, 2]"
    :filter="
      i => {
        exactType(i, numberType);
        return true;
      }
    "
    @change="
      exactType(
        // @ts-expect-error defineComponent 无法正常推断
        $event,
        numberArrayType
      )
    "
  >
  </RawGeneric>

  <SFCGeneric
    :list="[1, 2]"
    :filter="
      i => {
        exactType(i, numberType);
        return true;
      }
    "
    @change="exactType($event, numberArrayType)"
  >
    <template #foo="scope">{{ exactType(scope.list, numberArrayType) }}</template>
  </SFCGeneric>

  <GenericBar
    ref="x"
    :list="[1, 2]"
    :filter="
      i => {
        exactType(i, numberType);
        return true;
      }
    "
    @change="
      // @ts-expect-error 暂时无法正常推断
      exactType($event, numberArrayType)
    "
    @add="
      // @ts-expect-error 暂时无法正常推断
      exactType($event, numberType)
    "
  >
    <template #foo="scope">{{ exactType(scope, numberArrayType) }}</template>
  </GenericBar>

  <GenericBaz
    ref="x"
    :list="[1, 2]"
    :filter="
      i => {
        exactType(i, numberType);
        return true;
      }
    "
    @change="
      // @ts-expect-error 暂时无法正常推断
      exactType($event, numberArrayType)
    "
    @add="
      // @ts-expect-error 暂时无法正常推断
      exactType($event, numberType)
    "
  >
    <template #foo="scope">{{ exactType(scope, numberArrayType) }}</template>
  </GenericBaz>
</template>

<script lang="ts" setup>
  import { ref, defineComponent } from '@wakeadmin/demi';

  import { exactType, expectType } from '../__tests__/helper';

  import {
    declareComponent,
    declareEmits,
    declareExpose,
    declareProps,
    declareSlots,
    ExtraRef,
  } from './declareComponent';
  import { ComponentInstance, DefineComponentContext } from './types';
  import SFCGeneric from './raw-generic.d-test.vue';

  const stringType = '';
  const numberType = 1;
  const scopeType = {} as { a: number };
  const numberArrayType = {} as number[];

  const Foo = declareComponent({
    props: declareProps<{ a: number; b?: string }>(['a', 'b']),
    emits: declareEmits<{ change: (data: string) => void }>(),
    slots: declareSlots<{ foo: { a: number } }>(),
    expose: declareExpose<{ open: () => void }>(),
    setup() {
      return () => {
        return 'hello';
      };
    },
  });

  const count = ref(0);
  const fooRef = ref<ExtraRef<typeof Foo>>();

  const RawGeneric = defineComponent(
    <T>(
      props: { list: T[]; filter: (item: T) => boolean },
      ctx: {
        emit: (name: 'change', value: T[]) => void;
        // slots: { foo: (list: T[]) => any };
      }
    ) => {
      return {} as any;
    }
  );

  function OurGeneric<T>(
    props: { list: T[]; filter: (item: T) => boolean },
    ctx: DefineComponentContext<
      { change: (list: T[]) => void; add: (item: T) => void },
      {
        open: (item: T) => void;
        list: T[];
      },
      {
        foo: (list: T[]) => any;
      }
    >
  ) {
    ctx.emit('change', []);
    ctx.expose({
      open: item => {
        // ignore
      },
      list: props.list,
    });
    return {} as any;
  }

  OurGeneric.props = {
    list: Array,
    filter: Function,
  };

  const GenericBar = declareComponent(OurGeneric);

  interface GenericBazProps<T> {
    list: T[];
    filter: (item: T) => boolean;
  }

  type GenericBazEmit<T> = {
    add: (item: T) => void;
    change: (list: T[]) => void;
  };

  type GenericBazExpose<T> = {
    open: (item: T) => void;
    list: T[];
  };

  type GenericBazSlots<T> = {
    foo: (list: T[]) => any;
  };

  const GenericBaz = declareComponent({
    props: declareProps<GenericBazProps<any>>([]),
    emits: declareEmits<GenericBazEmit<any>>(),
    expose: declareExpose<GenericBazExpose<any>>(),
    slots: declareSlots<GenericBazSlots<any>>(),
    setup(props, ctx) {
      expectType<any[]>(props.list);
      ctx.emit('change', []);
      ctx.slots.foo?.([]);
      ctx.expose({
        list: [],
        open() {
          // ignore
        },
      });
      return {} as any;
    },
  }) as new <T>(...args: any[]) => ComponentInstance<
    GenericBazProps<T>,
    GenericBazEmit<T>,
    GenericBazExpose<T>,
    GenericBazSlots<T>
  >;
</script>
