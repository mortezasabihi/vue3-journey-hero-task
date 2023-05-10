<template>
  <div>
    <!-- Hide/Display fields -->
    <div class="px-2">
      <div class="text-h6 pt-2">Hide Fields</div>
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
  </Table>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import { VRow, VSwitch, VCol, VDivider } from 'vuetify/components'
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
