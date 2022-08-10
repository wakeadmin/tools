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
  <% if (type === 'vue3') { %>
  // 自定义命名空间
  // element-plus 建议使用 css variable 变量定义: https://element-plus.gitee.io/zh-CN/guide/theming.html#%E9%80%9A%E8%BF%87-css-%E5%8F%98%E9%87%8F%E8%AE%BE%E7%BD%AE
  @forward 'element-plus/theme-chalk/src/mixins/config.scss' with (
    $namespace: 'ep'
  );
  @use 'element-plus/theme-chalk/src/index.scss';

  <% } else { %>
  // 可以在这里定义 element-ui 变量: https://element.eleme.io/#/zh-CN/component/custom-theme
  $--color-primary: teal;

  /* 改变 icon 字体路径变量，必需 */
  $--font-path: '~element-ui/lib/theme-chalk/fonts';

  @import "~element-ui/packages/theme-chalk/src/index";

  <% } %>

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
