<template>
  <VListItem link :to="`/${todo.id}`">
    <!-- Left -->
    <template v-slot:prepend>
      <VAvatar color="grey-darken-1">
        <span class="text-h5">{{ todo.id }}</span>
      </VAvatar>
    </template>

    <!-- Center -->
    <VListItemTitle>{{ todo.title }} - <time class="text-caption">{{ formatedDate }}</time></VListItemTitle>

    <VListItemSubtitle>
      {{ todo.description }}
    </VListItemSubtitle>

    <!-- Right -->
    <template v-slot:append>
      <!-- Edit Button -->
      <VTooltip text="Edit" location="left">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" @click.prevent="$emit('onEditClick')" icon=" mdi-pen" variant="text" size="small" />
        </template>
      </VTooltip>
      <!-- Delete Button -->
      <VTooltip text="Delete" location="top">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" @click.prevent="onDelete" color="red-lighten-1" icon="mdi-trash-can" variant="text"
            size="small" />
        </template>
      </VTooltip>
    </template>
  </VListItem>

  <VSnackbar v-model="showAlert" :timeout="2000" color="teal" location="bottom left">
    "{{ todo.title }}" todo is deleted
  </VSnackbar>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue'
import { VListItem, VAvatar, VListItemTitle, VListItemSubtitle, VBtn, VTooltip, VSnackbar } from 'vuetify/components'
import { format } from 'date-fns'
import useTodoStore from '@/store/todo'
import type { ITodo } from '@/types/todo'

interface Props {
  todo: ITodo
}
interface Emits {
  (ev: 'onEditClick'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()
const showAlert = ref(false)
const formatedDate = format(new Date(props.todo.createdAt), 'MM/dd/yyyy')
const store = useTodoStore()

const onDelete = () => {
  const result = window.confirm(`Do you want to delete "${props.todo.title}" todo?`)

  showAlert.value = result

  if (result) {
    store.deleteTodo(props.todo.id)
  }
}
</script>
