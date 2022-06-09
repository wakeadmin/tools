<template>
  <Demo @click="hello" foo="x" ref="x">
    <template #fuck="scope">fuck</template>
  </Demo>
  <Foo foo="1" @click="" ref="x"></Foo>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
  import Demo from './demo.vue';
  import Foo from './Foo';

  const x = ref<{b: number}>()

  const hello = () => {};
</script>
