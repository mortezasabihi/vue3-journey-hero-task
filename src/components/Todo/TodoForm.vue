<template>
  <form @submit="onSubmit">
    <VRow>
      <VCol cols="12">
        <VTextField v-model="title.value.value" :error-messages="title.errorMessage.value" label="Title*" autofocus />
      </VCol>
      <VCol cols="12">
        <VTextarea v-model="description.value.value" :error-messages="description.errorMessage.value"
          label="Description*" />
      </VCol>
      <VCol cols="12">
        <VBtn color="green" type="submit">Submit</VBtn>
      </VCol>
    </VRow>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { VCol, VRow, VTextField, VTextarea, VBtn } from 'vuetify/components'
import { object, string } from 'yup'
import { useField, useForm } from 'vee-validate'
import type { TTodoForm } from '@/types/todo'

interface Props {
  value?: TTodoForm
}
interface Emits {
  (ev: 'submit', value: TTodoForm): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const validationSchema = object<TTodoForm>({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
})

const { handleSubmit } = useForm<TTodoForm>({
  validationSchema,
  initialValues: {
    title: props.value?.title || '',
    description: props.value?.description || '',
  }
})

const title = useField<TTodoForm['title']>('title')
const description = useField<TTodoForm['description']>('description')

const onSubmit = handleSubmit(values => {
  emits('submit', values)
})
</script>
