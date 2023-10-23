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

const component = computed(() => {
  switch (props.type) {
    case InputType.TEXTAREA:
      return InputType.TEXTAREA
  }
  return 'input'
})

const onInput = (event: Event) => {
  onResize()
  emit('input', event)
}
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

<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>
