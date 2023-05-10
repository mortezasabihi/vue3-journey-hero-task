<template>
  <Table :fields="fields" :items="items">
    <template #cell(dueDate)="{ value }">
      <span class="text-caption">{{ format(new Date(value as string), 'EEEE, MMMM do, yyyy hh:mm a') }}</span>
    </template>
    <template #cell(priority)="{ value }">
      <strong class="text-uppercase d-flex justify-center align-center h-100" :class="colorsClass[value]">
        {{ value }}
      </strong>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import type { ITodoItem } from '@/types/todo'
import Table, { type IField } from '@/components/Table.vue'
import { format } from 'date-fns'

interface Props {
  items: ITodoItem[]
}

defineProps<Props>()

const colorsClass = {
  low: 'bg-yellow',
  medium: 'bg-orange',
  high: 'bg-red'
}

const fields = reactive<IField[]>([
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
])
</script>
