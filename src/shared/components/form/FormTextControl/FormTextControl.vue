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
import { type Control } from '@/shared/type/field-types'
import { InputType } from '@/shared/type/input-types'
import { computed } from 'vue'
import { getInputAttrs } from '@/shared/util/control-util'

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

const input = computed(() => ({ ...getInputAttrs(props.control), ...props }))
</script>
