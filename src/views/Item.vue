<template>
  <VContainer class="py-8 px-6 mb-14" fluid>
    <VRow>
      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="8">
            <div class="d-flex align-start">
              <div class="mb-4 mr-2">
                <h2 class="text-h6 mb-1">{{ todo?.title }}</h2>

                <p>{{ todo?.description }}</p>
              </div>

              <VBtn @click="modal = true" density="comfortable" icon="mdi-plus" color="blue-darken-1" />
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

  <Modal v-model="modal" @update:model-value="selected = 0" :title="selected === 0 ? 'New Todo Item' : 'Edit Todo Item'">
    <TodoItemForm @submit="handleOnSubmit" />
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { VContainer, VRow, VCol, VCard, VTextField, VBtn } from 'vuetify/components'
import useTodoStore from '@/store/todo'
import TodoItem from '@/components/Todo/TodoItem/TodoItem.vue'
import Modal from '@/components/Modal.vue'
import TodoItemForm from '@/components/Todo/TodoItem/TodoItemForm.vue'
import { TTodoItemForm } from '@/types/todo'

const route = useRoute()
const param = route.params.id;
const store = useTodoStore()
const todo = store.getTodo(Number(param) || 0)
const search = ref('')
const modal = ref(false)
const selected = ref(0)

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

const handleOnSubmit = (form: TTodoItemForm) => {
  // create
  if (selected.value === 0) {
    store.createTodoItem(Number(param), form)
  } else {
    // update
    // store.updateTodo(selected.value, { ...form })
  }

  selected.value = 0
  modal.value = false
}
</script>
