<template>
  <VApp style="background: #eee">
    <Navbar />

    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { VApp, VMain } from 'vuetify/components';
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue'
</script>

