<template>
  <input
    v-bind="input"
    @keydown="onKeyDown"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
<script setup lang="ts">
import { InputType } from '@shared/types/input'
import type { Control } from '@shared/types/field'
import { computed } from 'vue'
import { getInputAttrs } from '@shared/utils/control'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  id: string
  type: InputType.INTEGER | InputType.NUMBER
  control: Control
  value?: number
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
}

const onKeyDown = (e: KeyboardEvent) => {
  // Fix: Chrome and Firefox behave differently with input type = 'number'
  // only allow numbers for `integers`
  // only allow numbers and decimals for `numbers`

  const { key, metaKey } = e
  if (!key || key.length > 1 || metaKey) {
    // ignore non input values
    return
  }

  const isNumber = !Number.isNaN(parseInt(key))
  const isDecimal = ['.'].includes(key)

  if (props.type === InputType.INTEGER) {
    if (!isNumber) {
      e.preventDefault()
    }
  } else if (props.type == InputType.NUMBER) {
    if (!isNumber && !isDecimal) {
      e.preventDefault()
    }
  }
}

const props = defineProps<Props>()

const input = computed(() => {
  return {
    ...getInputAttrs(props),
    ...props,
    step: InputType.INTEGER ? 1 : undefined,
    type: InputType.NUMBER
  }
})
</script>
