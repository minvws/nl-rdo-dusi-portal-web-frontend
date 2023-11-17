<template>
  <div>
    <div
      class="file-control"
      v-for="index in 3"
      :key="index - 1"
    >
      <FormTextControl
        v-bind="{ ...props, disabled: disabled || !!isPending?.[index - 1] }"
        :data-index="index - 1"
        @change="onChange"
        @focus="onFocus"
      />
      <FormFieldRemoveFile
        v-bind="{
          handleChange,
          index: index - 1,
          id: control.id,
          labelFor: id,
          files,
          error,
          disabled,
          isPending: !!isPending?.[index - 1]
        }"
        @blur="onBlur"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { FileType } from '@shared/types/form'

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
  isPending?: boolean[]
}

const props = defineProps<Props>()

// const isDisabled = computed(() => props.disabled || props.isPending)

const files = computed(() => {
  // @TODO: for now we only support one file
  const data = props.control.data as FileType[]
  return data
})

function onBlur(e: Event) {
  emit('blur', e)
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target?.files?.[0]
  const { maxFileSize } = props
  if (file && maxFileSize && file.size > maxFileSize) {
    // file exceeds maxFileSize
    e.preventDefault()
    const size = formatFileSize(maxFileSize)
    emit('error', translate('form.fields.error.maxFileSize', { maxFileSize: size }))
    return
  }
  emit('change', e)
}

function onFocus(e: Event) {
  emit('focus', e)
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
