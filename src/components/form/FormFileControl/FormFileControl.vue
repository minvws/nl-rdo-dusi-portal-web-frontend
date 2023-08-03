<template>
  <div class="file-control">
    <FormTextControl
      v-bind="props"
      @change="onChange"
      @focus="onFocus"
    />
    <FormFieldRemoveFile
      v-bind="{ handleChange, id: control.id, labelFor: id }"
      @blur="onBlur"
    />
  </div>
</template>
<script setup lang="ts">
import FormTextControl from '@/components/form/FormTextControl/FormTextControl.vue'
import FormFieldRemoveFile from '@/components/form/FormFieldRemoveFile/FormFieldRemoveFile.vue'
import { InputType } from '@/type/input-types'
import { type Control } from '@/type/field-types'
import { translate } from '@/i18n'
import { formatFileSize } from '@/util/format-util'

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
}

const props = defineProps<Props>()

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
