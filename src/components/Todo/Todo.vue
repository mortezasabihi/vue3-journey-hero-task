<template>
  <VListItem link :to="`/${id}`">
    <!-- Left -->
    <template v-slot:prepend>
      <VAvatar color="grey-darken-1">
        <span class="text-h5">{{ id }}</span>
      </VAvatar>
    </template>

    <!-- Center -->
    <VListItemTitle>{{ title }} - <time class="text-caption">{{ createdAt }}</time></VListItemTitle>

    <VListItemSubtitle>
      {{ description }}
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
    "{{ title }}" todo deleted
  </VSnackbar>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue'
import { VListItem, VAvatar, VListItemTitle, VListItemSubtitle, VBtn, VTooltip, VSnackbar } from 'vuetify/components'

interface Props {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}
interface Emits {
  (ev: 'onEditClick'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()
const showAlert = ref(false)

const onDelete = () => {
  const result = window.confirm(`Do you want to delete "${props.title}" todo?`)

  showAlert.value = result
}
</script>
