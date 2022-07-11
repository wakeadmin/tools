<template>
  <ElConfigProvider namespace="ep">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
  import { ElConfigProvider } from 'element-plus';
</script>
