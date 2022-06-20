<template>
  <div class="app">
    <div class="header"></div>
    <div class="container">
      <div class="sidebar">
        <JSXTest />
      </div>
      <div class="body" id="root"></div>
    </div>
    <div class="footer" @click="counter.add">{{ counter.count }} micro frontend demo</div>
  </div>
</template>

<script lang="ts" setup>
  import { JSXTest } from './JSXTest';
  import { useInject } from '@wakeadmin/framework';

  const counter = useInject('DI.demo.Counter');
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }

  .app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .header {
    height: 60px;
    background-color: gray;
  }

  .container {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .sidebar {
    width: 300px;
    background-color: #444;
  }

  .body {
    flex: 1;
    overflow: auto;
  }

  .footer {
    height: 30px;
    background-color: #eaeaea;
  }
</style>
