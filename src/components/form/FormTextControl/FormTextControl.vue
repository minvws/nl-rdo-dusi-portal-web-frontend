<template>
  <input
    v-bind="props"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
<script setup lang="ts">
import { type InputType } from '@/type/input-types'

defineEmits(['input', 'change', 'focus', 'blur'])
const props = defineProps<{
  id: string
  type: InputType
  value?: string
  disabled?: boolean
  autofocus?: boolean
  placeholder?: string
}>()
</script>
