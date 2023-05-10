<template>
  <div>
    <!-- Hide/Display fields -->
    <div class="px-2">
      <div class="text-body-1 pt-2">Hide Fields</div>
      <VRow class="px-2">
        <VCol cols="12" md="2" v-for="(field, index) in fields" :key="index">
          <VSwitch :label="field.hidden ? `${field.label} - (hidden)` : field.label" v-model="field.hidden" hideDetails />
        </VCol>
      </VRow>
    </div>

    <VDivider />
  </div>

  <Table :fields="fields" :items="items">
    <template #cell(dueDate)="{ value }">
      <span class="text-caption">{{ format(new Date(value as string), 'EEEE, MMMM do, yyyy hh:mm a') }}</span>
    </template>
    <template #cell(priority)="{ value }">
      <strong class="text-uppercase d-flex justify-center align-center h-100" :class="colorsClass[value]">
        {{ value }}
      </strong>
    </template>
    <template #cell(actions)="{ item }">
      <!-- Edit Button -->
      <VTooltip text="Edit" location="left">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" @click.prevent="$emit('onEditClick', item.id)" icon=" mdi-pen" variant="text"
            size="small" />
        </template>
      </VTooltip>
      <!-- Delete Button -->
      <VTooltip text="Delete" location="top">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" @click.prevent="onDelete(item.id)" color="red-lighten-1" icon="mdi-trash-can"
            variant="text" size="small" />
        </template>
      </VTooltip>
    </template>
  </Table>

  <!-- Delete Alert -->
  <VSnackbar v-model="showAlert" :timeout="2000" color="teal" location="bottom left">
    todo item is deleted
  </VSnackbar>
</template>

<script setup lang="ts">
import { defineProps, reactive, defineEmits, ref } from 'vue'
import { useRoute } from 'vue-router'
import { VRow, VSwitch, VCol, VDivider, VTooltip, VBtn, VSnackbar } from 'vuetify/components'
import type { ITodoItem } from '@/types/todo'
import Table, { type IField } from '@/components/Table.vue'
import { format } from 'date-fns'
import useTodoStore from '@/store/todo'

interface Props {
  items: ITodoItem[]
}
interface Emits {
  (ev: 'onEditClick', value: number): void
}

defineProps<Props>()
defineEmits<Emits>()

const route = useRoute()
const store = useTodoStore()
const showAlert = ref(false)

const colorsClass = {
  low: 'bg-yellow',
  medium: 'bg-orange',
  high: 'bg-red'
}

const fields = reactive<IField[]>([
  {
    key: 'id',
    label: 'Id',
    hidden: false
  },
  {
    key: 'title',
    label: 'Title',
    hidden: false
  },
  {
    key: 'description',
    label: 'Description',
    hidden: false
  },
  {
    key: 'dueDate',
    label: 'Due Date',
    hidden: false
  },
  {
    key: 'priority',
    label: 'Priority',
    hidden: false
  },
  {
    key: 'actions',
    label: 'Actions',
  },
])

const onDelete = (id: number) => {
  const result = window.confirm(`Do you want to delete todo item with "${id}" id?`)

  showAlert.value = result

  if (result) {
    store.deleteTodoItem(Number(route.params.id), id)
  }
}
</script>
