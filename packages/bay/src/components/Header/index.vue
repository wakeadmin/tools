<template>
  <div class="bay-header">
    <div class="bay-header__logo">logo</div>
    <Menus :bay="bay" />
    <div class="bay-header__dropdown">dropdown</div>
  </div>
</template>

<script lang="ts" setup>
  import { unref } from 'vue';
  import { useInject } from '@wakeadmin/framework';
  import Menus from './Menus.vue';

  const bay = unref(useInject('DI.bay.BayModel'));

  await bay.setup();
</script>

<style lang="scss">
  $bg-color: var(--wk-color-white);

  .bay-header {
    display: flex;
    height: 56px;
    background-color: $bg-color;
    box-shadow: 0 1px 0 0 #dce1e6;

    &__logo {
      width: var(--bay-sidebar-width);
    }
  }
</style>
