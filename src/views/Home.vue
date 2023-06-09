<template>
  <VContainer class="py-8 px-6 mb-14" fluid>
    <VRow>
      <VCol cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h6">List</h2>

          <div class="text-caption">Count: {{ store.list.length }}</div>
        </div>

        <VCard>
          <VList v-if="store.list.length" lines="two">
            <template v-for="(todo, index) in store.list" :key="index">
              <Todo :todo="todo" @on-edit-click="handleOnEditClick(todo.id)" />

              <VDivider v-if="index !== store.list.length - 1" :key="`divider-${index}`" inset />
            </template>
          </VList>

          <VCardText v-else>
            <p class="text-center text-lg-body-1 pa-10">Click on the + button and start creating Todos :)</p>
          </VCardText>

        </VCard>
      </VCol>
    </VRow>
  </VContainer>

  <VBtn density="comfortable" icon="mdi-plus" size="x-large" position="fixed" color="blue-darken-1"
    class="new-todolist-btn" @click="modal = true" />

  <Modal v-model="modal" @update:model-value="selected = 0" :title="selected === 0 ? 'New Modal' : 'Edit Modal'">
    <TodoForm :value="store.getTodo(selected)" @submit="handleOnSubmit" />
  </Modal>

  <!-- Add / Update Alert -->
  <VSnackbar v-model="showAlert" :timeout="2000" color="teal" location="bottom left">
    Todo {{ action }}
  </VSnackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VContainer, VRow, VCol, VCard, VList, VDivider, VBtn, VSnackbar, VCardText } from 'vuetify/components'
import Todo from '@/components/Todo/Todo.vue'
import Modal from '@/components/Modal.vue'
import TodoForm from '@/components/Todo/TodoForm.vue'
import useTodoStore from '@/store/todo'
import type { TTodoForm } from '@/types/todo'

const modal = ref(false)
const selected = ref(0)
const showAlert = ref(false)
const action = ref<'added' | 'updated'>()
const store = useTodoStore()

const handleOnEditClick = (id: number) => {
  selected.value = id
  modal.value = true
}

const handleOnSubmit = (form: TTodoForm) => {
  // create
  if (selected.value === 0) {
    store.createTodo({ ...form })
    action.value = 'added'
  } else {
    // update
    store.updateTodo(selected.value, { ...form })
    action.value = 'updated'
  }

  showAlert.value = true
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
