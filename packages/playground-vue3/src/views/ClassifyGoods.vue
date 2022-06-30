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
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const show = ref(false);
  const count = ref(0);
</script>
