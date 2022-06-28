<template>
  <nav class="bay-header__menus">
    <div
      v-for="item in bay.menu?.topMenus"
      :key="item.uid"
      class="bay-header__menu"
      :class="{ active: item.active }"
      @click="item.url && bay.openTreeNode(item)"
      :title="item.url"
    >
      {{ item.name }}

      <!-- 子菜单 -->
      <nav v-if="!item.url && item.children.length" class="bay-header__submenus">
        <div
          v-for="child in item.children"
          :key="child.uid"
          class="bay-header__submenu"
          :class="{ active: child.active }"
          @click="bay.openTreeNode(child)"
          :title="item.url"
        >
          {{ child.name }}
        </div>
      </nav>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';
  import { BayModel } from '@/BayModel';

  // eslint-disable-next-line vue/no-setup-props-destructure
  const { bay } = defineProps<{ bay: BayModel }>();
</script>

<style lang="scss">
  $active-color: var(--wk-color-primary);
  $bg-color: var(--wk-color-white);
  $menu-padding: 0 24px;
  $color: var(--wk-color-font-regular);

  .bay-header {
    &__menus {
      flex: 1;
      display: flex;
      font-size: var(--wk-font-size);
    }

    &__menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      position: relative;
      height: 100%;
      min-width: 100px;

      &.active::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        background-color: $active-color;
      }
    }

    &__menu:hover > &__submenus {
      display: block;
    }

    &__menu,
    &__submenu {
      color: $color;
      cursor: pointer;
      padding: $menu-padding;

      &:hover,
      &.active {
        color: $active-color;
      }
    }

    &__submenus {
      display: none;
      position: absolute;
      min-width: 100%;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      background: $bg-color;
      border: 1px solid #e4e7ed;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
      border-radius: 2px;
      overflow: hidden;
    }

    &__submenu {
      height: 38px;
      line-height: 38px;
      white-space: nowrap;
      text-align: center;
    }
  }
</style>
