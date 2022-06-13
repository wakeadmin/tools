<template>
  <!-- 报错 -->
  <Foo />

  <!-- 报错 -->
  <Foo :a="count" :b="1" />

  <!-- 推断 emit -->
  <Foo :a="1" @change="exactType($event, stringType)" />

  <!-- 推断 slot-->
  <Foo :a="1">
    <template #foo="scope">{{ exactType(scope, scopeType) }} </template>
  </Foo>

  <Foo :a="1" ref="fooRef" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue-demi';
  import {
    declareComponent,
    declareEmits,
    declareExpose,
    declareProps,
    declareSlots,
    ExtraRef,
  } from './declareComponent';
  import { exactType } from './shared.d-test';

  const stringType = '';
  const scopeType = {} as { a: number };

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
  const fooRef = ref<ExtraRef<typeof Foo>>(null);
</script>
