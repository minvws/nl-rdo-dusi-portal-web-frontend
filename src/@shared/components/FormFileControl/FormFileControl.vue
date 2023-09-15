<template>
  <div class="file-control">
    <FormTextControl
      v-bind="{ ...props, disabled: isDisabled }"
      @change="onChange"
      @focus="onFocus"
    />
    <FormFieldRemoveFile
      v-bind="{ handleChange, id: control.id, labelFor: id, error, disabled, isPending }"
      @blur="onBlur"
    />
  </div>
</template>
<script setup lang="ts">
import { type Control } from '@shared/types/field'

import { computed } from 'vue'

import FormTextControl from '@shared/components/FormTextControl/FormTextControl.vue'
import FormFieldRemoveFile from '@shared/components/FormFieldRemoveFile/FormFieldRemoveFile.vue'

import { InputType } from '@shared/types/input'
import { translate } from '@shared/i18n'
import { formatFileSize } from '@shared/utils/format'

const emit = defineEmits(['input', 'change', 'focus', 'blur', 'error'])

type Props = {
  accept?: string
  maxFileSize?: number
  autofocus?: boolean
  control: Control
  disabled?: boolean
  handleChange: (_path: string, _value: any) => void
  id: string
  placeholder?: string
  type: InputType
  value?: string
  error: string
  isPending: boolean
}

const props = defineProps<Props>()

const isDisabled = computed(() => props.disabled || props.isPending)

function onBlur(event: Event) {
  emit('blur', event)
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]
  const { maxFileSize } = props
  if (file && maxFileSize && file.size > maxFileSize) {
    // file exceeds maxFileSize
    event.preventDefault()
    const size = formatFileSize(maxFileSize)
    emit('error', translate('form.fields.error.maxFileSize', { maxFileSize: size }))
    return
  }
  emit('change', event)
}

function onFocus(event: Event) {
  emit('focus', event)
}
</script>

<style lang="scss" scoped>
.file-control {
  position: relative;
  input[type='file'] {
    color: transparent;
  }
}
</style>
