<template>
  <nav>
    vue3
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <a @click="navigateToVue2('/')">vue 2 Home</a> |
    <a @click="navigateToVue2('/about')">vue 2 About</a>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
  import * as vue3 from 'vue';

  // @ts-ignore
  console.log('vue3 is from base', vue3 === window.__mapp_shared_deps__.vue3);

  const navigateToVue2 = (path: string) => {
    history.pushState(null, 'vue2', `/base/vue2#${path}`);
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
