<template>
  <select
    v-bind="{ id, value, disabled, autofocus, placeholder }"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <option :label="placeholder" disabled />
    <option v-for="{ value, label } in options" :key="value" :value="value" :label="label" />
  </select>
</template>
<script setup lang="ts">
import { type InputType } from '@/type/input-types'
defineEmits(['input', 'change', 'focus', 'blur'])
defineProps<{
  id: string
  type: InputType
  value?: string
  disabled?: boolean
  autofocus?: boolean
  placeholder?: string
  options: { value: string; label: string }[]
}>()
</script>
