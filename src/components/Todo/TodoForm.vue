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
        <VBtn type="submit">Submit</VBtn>
      </VCol>
    </VRow>
  </form>
</template>

<script setup lang="ts">
import { VCol, VRow, VTextField, VTextarea, VBtn } from 'vuetify/components'
import { object, string } from 'yup'
import { useField, useForm } from 'vee-validate'

interface Form {
  title: string;
  description: string;
}

const validationSchema = object<Form>({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
})

const { handleSubmit } = useForm<Form>({
  validationSchema
})

const title = useField<Form['title']>('title')
const description = useField<Form['description']>('description')

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>
