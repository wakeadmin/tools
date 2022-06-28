<template>
  <Suspense>
    <div class="bay">
      <Header />
    </div>
    <template #fallback>loading...</template>
  </Suspense>
</template>

<script lang="ts" setup>
  import Header from '@/components/Header/index.vue';
</script>
