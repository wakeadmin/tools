<template>
  <router-view />
</template>

<script lang="ts" setup>
  import 'normalize.css';

  // 先导入 element-ui 样式, 后覆盖配置
  import 'element-plus/dist/index.css';
  import '@wakeadmin/theme';
  import '@wakeadmin/theme/adapter/element-plus.css';
</script>

<style lang="scss">
  // 全局样式 here
  :root {
    // 顶部标题栏高度
    --bay-top-height: 56px;

    // 侧边栏宽度
    --bay-sidebar-width: 192px;
  }
</style>
