<template>
  <VContainer class="py-8 px-6 mb-14" fluid>
    <VRow>
      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="8">
            <div class="mb-4">
              <h2 class="text-h6 mb-1">{{ todo?.title }}</h2>

              <p>{{ todo?.description }}</p>
            </div>
          </VCol>
          <VCol cols="12" md="4">
            <!-- Search -->
            <div class="pb-4 pt-4">
              <VRow class="px-2">
                <VCol cols="12">
                  <VTextField v-model="search" prepend-inner-icon="mdi-magnify" hideDetails density="compact"
                    variant="outlined" label="Search" />
                </VCol>
              </VRow>
            </div>
          </VCol>
        </VRow>

        <VCard>
          <!-- Table -->
          <TodoItem :items="filteredTodo?.items || []" />
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { VContainer, VRow, VCol, VCard, VTextField } from 'vuetify/components'
import useTodoStore from '@/store/todo'
import TodoItem from '@/components/Todo/TodoItem/TodoItem.vue'

const route = useRoute()
const param = route.params.id;
const store = useTodoStore()
const todo = store.getTodo(Number(param) || 0)
const search = ref<string>('')

const filteredTodo = computed(() => {
  if (search.value.trim().length) {
    const normalizedQuery = search.value.toLowerCase();

    const result = todo?.items.filter(item => (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.priority.toLowerCase().includes(normalizedQuery) ||
      item.dueDate.toLowerCase().includes(normalizedQuery)
    ));

    return {
      ...todo,
      items: result || []
    }
  }

  return todo
})
</script>
