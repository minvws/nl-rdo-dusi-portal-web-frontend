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
import { InputType } from '@/type/input-types'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  id: string
  type: InputType
  value?: string
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
}

const props = defineProps<Props>()
</script>
