<template>
  <div class="form-checkbox-group">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="checkbox"
    >
      <input
        type="checkbox"
        :value="item"
        :id="`${id}-${index}`"
        :disabled="disabled"
        :checked="values.includes(item)"
        @input="onChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <label :for="`${id}-${index}`">{{ item }}</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { getControlId } from '@shared/utils/control'
import type { Control } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

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

const values = computed(() => {
  return props.value ?? []
})

const items = computed(() => {
  return (props.control.schema.items as { type: string; enum: string[] })?.enum
})
const onChange = (e: Event) => {
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
