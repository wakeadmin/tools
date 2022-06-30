<template>
  <wkc-header>
    <div slot="title">title</div>
  </wkc-header>

  <wkc-header title="hello world" style="margin-top: 10px">
    <button slot="extra">submit</button>
    <div>查询区域</div>
  </wkc-header>

  <wkc-content>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
  </wkc-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

  export default defineComponent({
    name: 'HomeView',
    components: {
      HelloWorld,
    },
  });
</script>
