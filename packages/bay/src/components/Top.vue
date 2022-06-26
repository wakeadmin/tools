<template>
  <div>
    top
    <div v-if="bay.loading">loading</div>
  </div>
</template>

<script lang="ts" setup>
  import { useInject } from '@wakeadmin/framework';

  const bay = useInject('DI.bay.BayModel');
</script>
