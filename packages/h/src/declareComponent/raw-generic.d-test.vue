<template>
  <div>test</div>
</template>

<script setup lang="ts" generic="T">
  import { ref } from 'vue';

  const data = ref<T[] | null>();

  defineProps<{
    list: T[];
    filter: (item: T) => boolean;
  }>();

  defineEmits<{
    (e: 'change', list: T[]): void;
  }>();

  defineSlots<{
    foo: (scope: { list: T[] }) => any;
  }>();

  defineExpose({ data });
</script>
