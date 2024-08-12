<template>
  <input
    v-bind="input"
    @keypress="onKeyPress"
    :aria-describedby="ariaDescribedby"
    :aria-invalid="ariaInvalid"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { Control } from '@shared/types/field'
import { InputType } from '@shared/types/input'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { getInputAttrs } from '@shared/utils/control'
import { isNumberKey } from '@shared/utils/number'

defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  ariaDescribedby?: string
  ariaInvalid?: boolean
  autofocus?: boolean
  control: Control
  disabled?: boolean
  id: string
  placeholder?: string
  type: InputType.INTEGER | InputType.NUMBER
  value?: number | string
}

type Input = {
  autocomplete: string
  autofocus: boolean
  disabled: boolean
  id: string
  inputmode: InputHTMLAttributes['inputmode']
  lang: string
  max: string | number | undefined
  maxlength: number | undefined
  min: string | number | undefined
  minlength: number | undefined
  placeholder: string | undefined
  step: string | undefined
  type: InputType.NUMBER
  value: string | number | undefined
}

const props = defineProps<Props>()

const { locale } = useI18n()

const input = computed<Input>(() => {
  const { max, maxlength, min, minlength, step } = getInputAttrs(props)
  const { autofocus, disabled, id, placeholder, value } = props
  const inputmode = props.type === InputType.INTEGER ? 'numeric' : 'decimal'

  return {
    autocomplete: 'off',
    autofocus,
    disabled,
    id,
    inputmode,
    lang: locale.value,
    max,
    maxlength,
    min,
    minlength,
    placeholder,
    step,
    type: InputType.NUMBER,
    value
  }
})

/**
 * Chrome and Firefox behave differently with number inputs.
 * - integers: only allow numbers keys
 * - floats: only allow numbers and decimals keys
 */
function onKeyPress(event: KeyboardEvent): void {
  const { key } = event
  const keyIsValid = isNumberKey(key)

  if (!keyIsValid) {
    event.preventDefault()
    return
  }

  const keyIsNumber = !Number.isNaN(Number.parseInt(key, 10))
  const keyIsDecimal = ['.', ','].includes(key)
  const isInvalidInteger = props.type === InputType.INTEGER && !keyIsNumber
  const isInvalidNumber = props.type === InputType.NUMBER && !keyIsNumber && !keyIsDecimal

  if (isInvalidInteger) {
    event.preventDefault()
    return
  }

  if (isInvalidNumber) {
    event.preventDefault()
    return
  }
}
</script>
