<template>
  <component
    :is="component"
    ref="el"
    v-bind="input"
    :aria-describedby="ariaDescribedby"
    :aria-invalid="ariaInvalid"
    @input="onInput"
    @change="emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script setup lang="ts">
import type { Control } from '@shared/types/field'
import { InputType } from '@shared/types/input'

import { computed } from 'vue'

import { useTextAreaAutoSize } from '@shared/composables/useTextAreaAutoSize'

import { getInputAttrs, isReadonlySupported } from '@shared/utils/control'

const emit = defineEmits(['input', 'change', 'focus', 'blur'])

type Props = {
  ariaDescribedby?: string
  ariaInvalid?: boolean
  autofocus?: boolean
  control: Control
  disabled?: boolean
  readonly?: boolean
  id: string
  placeholder?: string
  type: InputType
  value?: string
}

const props = defineProps<Props>()

const { el, onResize } = useTextAreaAutoSize(props.type)

const component = computed<'input' | 'textarea'>(() => {
  switch (props.type) {
    case InputType.TEXTAREA: {
      return 'textarea'
    }
    default: {
      return 'input'
    }
  }
})

const input = computed<{
  id: string
  value: string | undefined
  placeholder: string | undefined
  disabled: boolean
  readonly: boolean
  autofocus: boolean
  type: InputType
  autocomplete?: string
  minlength?: number | undefined
  maxlength?: number | undefined
  rows?: number
}>(() => {
  const { id, type, value, placeholder, disabled, readonly, autofocus } = props
  const isReadonly = readonly && isReadonlySupported(type)
  return {
    id,
    value,
    placeholder,
    disabled,
    readonly: isReadonly,
    autofocus,
    type,
    ...(!isReadonly ? getInputAttrs(props) : {})
  }
})

function onInput(event: InputEvent): void {
  onResize()
  emit('input', event)
}
</script>

<style lang="scss" scoped>
textarea {
  resize: vertical;
}
</style>
