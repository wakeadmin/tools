<template>
  <div class="about">
    <wkc-header class="hello" style="color: red">hello world</wkc-header>
    <ReferByJSX />
    <ReferBySPA />
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts" setup>
  import ReferByJSX from './components/ReferByJSX';
  import ReferBySPA from './components/ReferBySPA.vue';
</script>
