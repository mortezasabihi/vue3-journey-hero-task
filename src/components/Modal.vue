<template>
  <VRow justify="center">
    <VDialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" width="1024">
      <VCard>
        <VCardTitle>
          <span class="text-h5">{{ title }}</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <slot />
          </VContainer>
        </VCardText>
      </VCard>
    </VDialog>
  </VRow>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { VCard, VCardText, VCardTitle, VContainer, VDialog, VRow } from 'vuetify/components'

interface Props {
  modelValue: boolean
  title: string
}
interface Emits {
  (ev: 'update:modelValue', value: boolean): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
