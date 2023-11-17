<template>
  <div>
    <div
      class="file-control"
      :class="{ margin: !!index }"
      v-for="index in numberOfFiles"
      :key="index"
    >
      <FormTextControl
        v-bind="{ ...props, disabled: disabled || !!isPending?.[index] }"
        :data-index="index"
        @change="onChange"
        @focus="onFocus"
      />
      <FormFieldRemoveFile
        v-bind="{
          handleChange,
          index: index,
          id: control.id,
          labelFor: id,
          files,
          error,
          disabled,
          isPending: !!isPending?.[index]
        }"
        @blur="onBlur"
      />
    </div>
    <FormFieldAddFileButton
      v-if="hasAddFileButton"
      @click="onAddFileButton"
    />
  </div>
</template>
<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { FileType } from '@shared/types/form'

import { ref, computed, watch } from 'vue'

import FormTextControl from '@shared/components/FormTextControl/FormTextControl.vue'
import FormFieldRemoveFile from '@shared/components/FormFieldRemoveFile/FormFieldRemoveFile.vue'
import FormFieldAddFileButton from '@shared/components/FormFieldAddFileButton/FormFieldAddFileButton.vue'

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

const addFileCount = ref(1)

const files = computed(() => {
  const data = props.control.data as FileType[]
  return data
})

const props = defineProps<Props>()

const maxFiles = computed(() => props.control.schema.maxItems ?? 1)

const numberOfFilesAdded = computed(() => {
  return files.value?.length ?? 0
})
const numberOfFiles = computed(() => {
  return Array.from(Array(Math.min(numberOfFilesAdded.value + 1, addFileCount.value)).keys())
})

const hasAddFileButton = computed(() => {
  return (
    numberOfFilesAdded.value === addFileCount.value && numberOfFilesAdded.value < maxFiles.value
  )
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

function onAddFileButton() {
  addFileCount.value++
}

watch(files, (files, before) => {
  const to = files?.length || 0
  const from = before?.length || 0
  if (to > from) return
  addFileCount.value = Math.max(addFileCount.value - 1, 1)
})
</script>

<style lang="scss" scoped>
.file-control {
  position: relative;
  &.margin {
    margin-top: 0.5em;
  }

  input[type='file'] {
    color: transparent;
  }
}
</style>
