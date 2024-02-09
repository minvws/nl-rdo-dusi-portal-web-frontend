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
import type { Control } from '@shared/types/field'

import { InputType } from '@shared/types/input'
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

const props = defineProps<Props>()

const input = computed<{
  step: number | undefined
  type: InputType
  id: string
  control: Control
  value: number | undefined
  placeholder: string | undefined
  disabled: boolean
  autofocus: boolean
  autocomplete: string
  min: string | number | undefined
  max: string | number | undefined
  minlength: number | undefined
  maxlength: number | undefined
}>(() => ({
  ...getInputAttrs(props),
  ...props,
  step: InputType.INTEGER ? 1 : undefined,
  type: InputType.NUMBER
}))

function onKeyDown(event: KeyboardEvent): void {
  // Fix: Chrome and Firefox behave differently with input type = 'number'
  // only allow numbers for `integers`
  // only allow numbers and decimals for `numbers`

  const { key, metaKey } = event
  if (!key || key.length > 1 || metaKey) {
    // ignore non input values
    return
  }

  const isNumber = !Number.isNaN(Number.parseInt(key, 10))
  const isDecimal = ['.'].includes(key)

  if (props.type === InputType.INTEGER && !isNumber) {
    event.preventDefault()
  } else if (props.type === InputType.NUMBER && !isNumber && !isDecimal) {
    event.preventDefault()
  }
}
</script>
