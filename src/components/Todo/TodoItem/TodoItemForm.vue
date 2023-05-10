<template>
  <form @submit="onSubmit">
    <VRow>
      <VCol cols="12">
        <VTextField v-model="title.value.value" :error-messages="title.errorMessage.value" label="Title*" autofocus />
      </VCol>
      <VCol cols="12" md="6">
        <Datepicker v-model="dueDate.value.value" />
      </VCol>
      <VCol cols="12" md="6">
        <VCombobox v-model="priority.value.value" :items="['low', 'medium', 'high']" label="Default" />
      </VCol>
      <VCol cols="12">
        <VTextarea v-model="description.value.value" :error-messages="description.errorMessage.value"
          label="Description*" />
      </VCol>
      <VCol cols="12">
        <VBtn type="submit" color="green">Submit</VBtn>
      </VCol>
    </VRow>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { VCol, VRow, VTextField, VTextarea, VBtn, VCombobox } from 'vuetify/components'
import { object, string } from 'yup'
import { useField, useForm } from 'vee-validate'
import type { ITodoItem } from '@/types/todo'
import Datepicker from 'vuejs3-datepicker';

interface Props {
  value?: ITodoItem
}
interface Emits {
  (ev: 'submit', value: ITodoItem): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const validationSchema = object<ITodoItem>({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
  dueDate: string().required('Description is required'),
  priority: string().required('Priority is required')
})

const { handleSubmit } = useForm<ITodoItem>({
  validationSchema,
  initialValues: {
    title: props.value?.title || '',
    description: props.value?.description || '',
    dueDate: props.value?.dueDate || new Date().toString(),
    priority: props.value?.priority || 'high',
  }
})

const title = useField<ITodoItem['title']>('title')
const description = useField<ITodoItem['description']>('description')
const dueDate = useField<ITodoItem['dueDate']>('dueDate')
const priority = useField<ITodoItem['priority']>('priority')

const onSubmit = handleSubmit(values => {
  emits('submit', values)
})
</script>

<style>
.vuejs3-datepicker,
.vuejs3-datepicker__value {
  min-width: 100% !important
}
</style>
