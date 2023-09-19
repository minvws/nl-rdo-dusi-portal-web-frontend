<template>
  <select
    v-bind="{ id, value, disabled, autofocus, placeholder }"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <option
      :label="placeholder"
      disabled
    />
    <option
      v-for="{ value, label } in options"
      :key="value"
      :value="value"
      :textContent="value"
      :label="label"
    />
  </select>
</template>
<script setup lang="ts">
import { InputType } from '@shared/types/input'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  autofocus?: boolean
  disabled?: boolean
  id: string
  options: { value: string; label: string }[]
  placeholder?: string
  type: InputType
  value?: string
}

defineProps<Props>()
</script>
