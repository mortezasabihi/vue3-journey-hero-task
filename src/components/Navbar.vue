<template>
  <VAppBar app>
    <VBtn icon>
      <VIcon>mdi-list-status</VIcon>
    </VBtn>

    <RouterLink to="/" class="navbar-title">
      <VAppBarTitle>Todo</VAppBarTitle>
    </RouterLink>
  </VAppBar>
</template>

<script setup lang="ts">
import { VAppBar, VAppBarTitle, VBtn, VIcon } from 'vuetify/components'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar-title {
  text-decoration: none;
  color: black;
}
</style>
