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
        :id="`${id}-${index}`"
        :disabled="disabled"
        :checked="values.includes(value)"
        @input="onChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <label :for="`${id}-${index}`">{{ title }}</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'
import { computed } from 'vue'
import { getControlId } from '@shared/utils/control'

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

const values = computed(() => props.value ?? [])

const items = computed(() => {
  const items = props.control.schema.items as {
    type: string
    enum?: string[]
    oneOf?: { title: string; const: string }[]
  }

  return (
    items?.oneOf?.map(({ title, const: value }) => ({ title, value })) ??
    items?.enum?.map(title => ({ title, value: title }))
  )
})

function onChange(e: Event) {
  e.stopPropagation()
  const target = e.target as HTMLInputElement
  const { value, checked } = target
  const data = [...values.value]

  while (data.includes(value)) {
    const index = data.indexOf(value)
    data.splice(index, 1)
  }

  if (checked) data.push(value)

  props.handleChange(getControlId(props.control.id), data)
}
</script>

<style lang="scss" scoped>
.form-checkbox-group {
  display: block;
}
</style>
