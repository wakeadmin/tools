<template>
  <div>
    <ByDefineComponent foo @ok="handleOk" />
    <BySPA color="hello" @change="handleOk" />
    <ByDeclareComponent foo="x" @ok="handleOk" />
  </div>
</template>

<script setup lang="tsx">
  import ByDefineComponent from './ByDefineComponent';
  import BySPA from './BySPA.vue';
  import ByDeclareComponent from './ByDeclareComponent';

  const handleOk = () => {
    console.log('ok');
  };
</script>
