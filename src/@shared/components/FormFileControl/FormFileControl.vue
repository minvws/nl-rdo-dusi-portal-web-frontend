<template>
  <div>
    <template
      v-for="index in numberOfFiles"
      :key="index"
    >
      <div
        class="file-control"
        :class="{ margin: !!index }"
      >
        <FormTextControl
          v-bind="{
            ...textControlProps,
            id: `${id}-${index}`,
            disabled: disabled || !!isPending?.[index]
          }"
          :data-index="index"
          @change="onChange"
          @focus="onFocus"
        />
        <FormFieldRemoveFile
          v-bind="{
            handleChange,
            index: index,
            id: control.id,
            labelFor: `${id}-${index}`,
            files,
            error,
            disabled,
            isPending: !!isPending?.[index]
          }"
          @blur="onBlur"
        />
      </div>
      <FormFieldAddFileButton
        v-if="showAddFileButton(index)"
        @click="onAddFileButton"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Control } from '@shared/types/field'
import type { FileType } from '@shared/types/form'

import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import FormTextControl from '@shared/components/FormTextControl/FormTextControl.vue'
import FormFieldRemoveFile from '@shared/components/FormFieldRemoveFile/FormFieldRemoveFile.vue'
import FormFieldAddFileButton from '@shared/components/FormFieldAddFileButton/FormFieldAddFileButton.vue'

import { InputType } from '@shared/types/input'
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

const { t } = useI18n()

const addFileCount = ref(1)

const files = computed<FileType[]>(() => props.control.data as FileType[])

const textControlProps = computed<{
  type: InputType
  control: Control
  value: string | undefined
  placeholder: string | undefined
  autofocus: boolean
}>(() => ({
  type: props.type,
  control: props.control,
  value: props.value,
  placeholder: props.placeholder,
  autofocus: props.autofocus
}))

const maxFiles = computed<number>(() => props.control.schema.maxItems ?? 1)

const numberOfFilesAdded = computed<number>(() => files.value?.length ?? 0)

const numberOfFiles = computed<number[]>(() => {
  const count = Math.max(numberOfFilesAdded.value, addFileCount.value)
  const keys = Array(count).keys()

  return Array.from(keys)
})

function showAddFileButton(index: number) {
  return index + 1 === numberOfFiles.value.length && index + 1 !== maxFiles.value
}

function onBlur(e: Event) {
  emit('blur', e)
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target?.files?.[0]
  const { maxFileSize } = props

  // file exceeds maxFileSize
  if (file && maxFileSize && file.size > maxFileSize) {
    e.preventDefault()
    const size = formatFileSize(maxFileSize)
    emit('error', t('form.fields.error.maxFileSize', { maxFileSize: size }))
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

  if (to > from) {
    return
  }

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
