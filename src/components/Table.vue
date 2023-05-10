<template>
  <VTable>
    <thead>
      <tr>
        <th v-for="(field, index) in displayedFields" :key="index">
          <slot :name="`head(${field.key})`" :field="field">
            {{ field.label }}
          </slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.id">
        <template v-for="(key, index) in displayedFieldKeys" :key="index">
          <Component :is="cellElement(key as string)">
            <slot :name="`cell(${key})`" :value="item[key]" :item="item">
              {{ item[key] }}
            </slot>
          </Component>
        </template>
      </tr>
    </tbody>
  </VTable>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { VTable } from 'vuetify/components'

export interface IField {
  key: string
  label: string
  hidden?: boolean
  header?: boolean
}
export interface IItem {
  id: number
  [key: string]: unknown
}
interface Props {
  fields: IField[]
  items: IItem[]
}

const props = defineProps<Props>()

const displayedFields = computed(() => props.fields.filter((i) => !i.hidden))
const displayedFieldKeys = computed(() => Object.entries(displayedFields.value).map(([_key, value]) => value.key))

const cellElement = (key: string) => {
  const field = props.fields.find((f) => f.key === key)
  return field && field.header ? 'th' : 'td'
}
</script>
