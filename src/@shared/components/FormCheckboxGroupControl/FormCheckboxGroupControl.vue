<template>
  <div class="form-checkbox-group">
    <div
      v-for="({ title, value }, index) in items"
      :key="index"
      class="checkbox"
    >
      <input
        type="checkbox"
        :value="value"
        :id="getIndexedId(index)"
        :disabled="disabled"
        :checked="values.includes(value)"
        @input="onChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <label :for="getIndexedId(index)">{{ title }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

import { computed } from 'vue'

import { useA11yStore } from '@shared/store/useA11yStore'

defineEmits(['change', 'focus', 'blur'])

type Props = {
  autofocus?: boolean
  disabled?: boolean
  id: string
  value?: string[]
  control: Control
  handleChange: (_path: string, _value: FormValue) => void
}

const props = defineProps<Props>()

const a11yStore = useA11yStore()

const values = computed<string[]>(() => props.value ?? [])

const items = computed<{ title: string; value: string }[] | undefined>(() => {
  const items = props.control.schema.items as {
    type: string
    enum?: string[]
    oneOf?: { title: string; const: string }[]
  }

  return (
    items?.oneOf?.map(({ title, const: value }) => ({ title, value })) ??
    items?.enum?.map((title) => ({ title, value: title }))
  )
})

function getIndexedId(index: number): string {
  return a11yStore.getA11yInputId(props.control.id, index)
}

function onChange(event: Event): void {
  event.stopPropagation()

  if (!(event.target instanceof HTMLInputElement)) {
    return
  }

  const { value, checked } = event.target
  const data = [...values.value]

  while (data.includes(value)) {
    const index = data.indexOf(value)
    data.splice(index, 1)
  }

  if (checked) {
    data.push(value)
  }

  props.handleChange(props.control.path, data)
}
</script>

<style lang="scss" scoped>
.form-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
