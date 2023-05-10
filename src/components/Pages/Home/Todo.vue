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
  </VListItem>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { VListItem, VAvatar, VListItemTitle, VListItemSubtitle } from 'vuetify/components'

interface Props {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

defineProps<Props>()
</script>
