<template>
  <input
    v-bind="input"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
<script setup lang="ts">
import type { Control } from '@shared/types/field'
import { InputType } from '@shared/types/input'
import { computed } from 'vue'
import { getInputAttrs } from '@shared/utils/control'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  id: string
  type: InputType
  control: Control
  value?: string
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
}

const props = defineProps<Props>()

const input = computed(() => {
  const { id, value, placeholder, disabled, autofocus } = props
  return {
    id,
    value,
    placeholder,
    disabled,
    autofocus,
    ...getInputAttrs(props)
  }
})
</script>
