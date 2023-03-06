<template>
  <div id="app">
    vue2
    <nav><router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |</nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import '@wakeadmin/theme/dist/share.css';
  import '@wakeadmin/theme/dist/element-ui.css';
</script>
