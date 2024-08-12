<template>
  <select
    v-bind="input"
    :aria-describedby="ariaDescribedby"
    :aria-invalid="ariaInvalid"
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
      :text-content="value"
      :label="label"
    />
  </select>
</template>
<script setup lang="ts">
import { InputType } from '@shared/types/input'

import { computed } from 'vue'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  ariaDescribedby?: string
  ariaInvalid?: boolean
  autofocus?: boolean
  disabled?: boolean
  id: string
  options: { value: string; label: string }[]
  placeholder?: string
  type: InputType
  value?: string
}

const props = defineProps<Props>()

const input = computed<{
  id: string
  value: string | undefined
  placeholder: string | undefined
  disabled: boolean
  autofocus: boolean
}>(() => {
  const { id, value, placeholder, disabled, autofocus } = props
  return {
    id,
    value,
    placeholder,
    disabled,
    autofocus,
  }
})
</script>
