<template>
  <VContainer class="py-8 px-6 mb-14" fluid>
    <VRow>
      <VCol cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h6">List</h2>

          <div class="text-caption">Count: 4</div>
        </div>

        <VCard>
          <VList lines="two">
            <template v-for="n in 6" :key="n">
              <Todo :title="`Message ${n}`" :id="n"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"
                created-at="Jan 9, 2022" />

              <VDivider v-if="n !== 6" :key="`divider-${n}`" inset />
            </template>
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>

  <VBtn density="comfortable" icon="mdi-plus" size="x-large" position="absolute" color="blue-darken-1"
    class="new-todolist-btn" />
</template>

<script setup lang="ts">
import { VContainer, VRow, VCol, VCard, VList, VDivider, VBtn } from 'vuetify/components'
import Todo from '@/components/Pages/Home/Todo.vue';
</script>

<style scoped>
.new-todolist-btn {
  right: 1rem;
  bottom: 1rem;
}
</style>
