<% if (type === 'vue2') { %>
<template>
  <div id="app">
    <nav><router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |</nav>
    <router-view />
  </div>
</template>
<%  } else { %>
<template>
  <ElConfigProvider namespace="ep">
    <div id="app">
      <nav><router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |</nav>
      <router-view />
    </div>
  </ElConfigProvider>
</template>
<%  } %>

<script lang="ts" setup>
  <%- type === 'vue3' ? "import { ElConfigProvider } from 'element-plus'" : '' %>
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
