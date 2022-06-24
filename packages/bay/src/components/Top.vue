<template>
  <div>
    top
    <div v-if="menuModel.createMenus.loading">loading</div>
  </div>
</template>

<script lang="ts" setup>
  import { useInject } from '@wakeadmin/framework';

  const menuModel = useInject('DI.bay.MenuModel');
</script>
