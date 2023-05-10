<template>
  <VContainer class="py-8 px-6 mb-14" fluid>
    <VRow>
      <VCol cols="12">
        <div class="mb-4">
          <h2 class="text-h6 mb-1">{{ todo?.title }}</h2>

          <p>{{ todo?.description }}</p>
        </div>

        <VCard>
          <TodoItem :items="todo?.items || []" />
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { VContainer, VRow, VCol, VCard } from 'vuetify/components'
import useTodoStore from '@/store/todo'
import TodoItem from '@/components/Todo/TodoItem/TodoItem.vue'

const route = useRoute()
const param = route.params.id;
const store = useTodoStore()
const todo = store.getTodo(Number(param) || 0)
</script>
