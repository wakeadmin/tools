<template>
  <div>
    <slot name="fuck" data="1"></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{ foo: string }>();
  const emit = defineEmits<{ (e: 'click', data: string): void }>();

  defineExpose({ a: 1, b: 2 });
</script>
