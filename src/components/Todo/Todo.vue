<template>
  <VListItem link :to="`/${id}`">
    <template v-slot:prepend>
      <VAvatar color="grey-darken-1">
        <span class="text-h5">{{ id }}</span>
      </VAvatar>
    </template>

    <VListItemTitle>{{ title }} - <time class="text-caption">{{ createdAt }}</time></VListItemTitle>

    <VListItemSubtitle>
      {{ description }}
    </VListItemSubtitle>

    <template v-slot:append>
      <VTooltip text="Delete" location="top">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" @click.prevent="onDelete" color="red-lighten-1" icon="mdi-trash-can" variant="text"
            size="small" />
        </template>
      </VTooltip>
    </template>
  </VListItem>

  <VSnackbar v-model="showAlert" :timeout="2000" color="teal" location="bottom left">
    "{{ title }}" todo deleted
  </VSnackbar>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { VListItem, VAvatar, VListItemTitle, VListItemSubtitle, VBtn, VTooltip, VSnackbar } from 'vuetify/components'

interface Props {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const props = defineProps<Props>()
const showAlert = ref(false)

const onDelete = () => {
  const result = window.confirm(`Do you want to delete "${props.title}" todo?`)

  showAlert.value = result
}
</script>
