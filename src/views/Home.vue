<template>
  <VContainer class="py-8 px-6 mb-14" fluid>
    <VRow>
      <VCol cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h6">List</h2>

          <div class="text-caption">Count: {{ store.list.length }}</div>
        </div>

        <VCard>
          <VList lines="two">
            <template v-for="(todo, index) in store.list" :key="index">
              <Todo :todo="todo" @on-edit-click="handleOnEditClick(todo.id)" />

              <VDivider v-if="index !== store.list.length - 1" :key="`divider-${index}`" inset />
            </template>
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>

  <VBtn density="comfortable" icon="mdi-plus" size="x-large" position="absolute" color="blue-darken-1"
    class="new-todolist-btn" @click="modal = true" />

  <Modal v-model="modal" @update:model-value="selected = 0" :title="selected === 0 ? 'New Modal' : 'Edit Modal'">
    <TodoForm :value="store.getTodo(selected)" @submit="handleOnSubmit" />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VContainer, VRow, VCol, VCard, VList, VDivider, VBtn } from 'vuetify/components'
import Todo from '@/components/Todo/Todo.vue'
import Modal from '@/components/Modal.vue'
import TodoForm from '@/components/Todo/TodoForm.vue'
import useTodoStore from '@/store/todo'
import type { TTodoForm } from '@/types/todo'

const modal = ref(false)
const selected = ref(0)
const store = useTodoStore()

const handleOnEditClick = (id: number) => {
  selected.value = id
  modal.value = true
}

const handleOnSubmit = (form: TTodoForm) => {
  // create
  if (selected.value === 0) {
    store.createTodo({ ...form })
  } else {
    // update
    store.updateTodo(selected.value, { ...form })
  }

  selected.value = 0
  modal.value = false
}
</script>

<style scoped>
.new-todolist-btn {
  right: 1rem;
  bottom: 1rem;
}
</style>
