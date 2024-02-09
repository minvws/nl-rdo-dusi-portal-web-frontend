<template>
  <component
    :is="component"
    ref="el"
    v-bind="input"
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
import { getInputAttrs } from '@shared/utils/control'
import { useTextAreaAutoSize } from '@shared/composables/useTextAreaAutoSize'

const emit = defineEmits(['input', 'change', 'focus', 'blur'])

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
  autofocus: boolean
  autocomplete: string
  minlength: number | undefined
  maxlength: number | undefined
}>(() => {
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

function onInput(event: InputEvent): void {
  onResize()
  emit('input', event)
}
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>
