<template>
  <VApp>
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { VApp, VMain } from 'vuetify/components';
import { RouterView } from 'vue-router';
</script>

