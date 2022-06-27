<template>
  <div class="bay-header">
    <div class="bay-header__logo">logo</div>
    <nav class="bay-header__menus">
      <div v-for="item in bay.menu?.topMenus" :key="item.uid" class="bay-header__menu">
        {{ item.name }}
      </div>
      <el-button type="primary">hello</el-button>
    </nav>
    <div class="bay-header__dropdown">dropdown</div>
  </div>
</template>

<script lang="ts" setup>
  import { unref } from 'vue';
  import { useInject } from '@wakeadmin/framework';

  const bay = unref(useInject('DI.bay.BayModel'));

  await bay.setup();
</script>

<style lang="scss">
  .bay-header {
    display: flex;
    height: var(--bay-header-height);

    &__logo {
      width: var(--bay-sidebar-width);
    }

    &__menus {
      flex: 1;
      display: flex;
      font-size: 14px;
    }

    &__menu {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
