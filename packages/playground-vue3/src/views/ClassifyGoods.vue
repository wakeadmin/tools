<template>
  <wkc-header>
    <button slot="extra">goods</button>
    <button slot="extra">2</button>
  </wkc-header>
  <wkc-content> ClassifyGoods </wkc-content>
  <button @click="show = !show">toggle</button>
  <wkc-sidebar-bottom-slot v-if="show"
    ><div @click="count++">hello {{ count }}</div>
    <span v-if="count % 2 == 0">even</span>
    <div slot="collapse">collapse1</div>
    <div slot="collapse">collapse2</div>
    <div slot="expand">expand</div>
  </wkc-sidebar-bottom-slot>

  <wkc-header-slot>hello</wkc-header-slot>
  <wkc-sidebar-bottom-slot>hello</wkc-sidebar-bottom-slot>
  <wkc-header-dropdown-menu title="hello" @click="handleMenuClick"></wkc-header-dropdown-menu>
  <wkc-header-dropdown-menu icon="Add" title="world" @click="handleMenuClick"></wkc-header-dropdown-menu>
  <wkc-breadcrumb :list.prop="[{ title: 'custom' }]" />
  <wkc-float-footer style="background-color: red"
    ><button class="my-button">hello</button><ElButton>fukc</ElButton></wkc-float-footer
  >
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElButton } from 'element-plus';

  const show = ref(false);
  const count = ref(0);
  const handleMenuClick = () => console.log('menu-click');
</script>

<style>
  .my-button {
    background-color: red;
  }
</style>
