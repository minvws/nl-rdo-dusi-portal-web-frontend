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
          v-bind="textControlProps"
          :id="getIndexedId(index)"
          :disabled="disabled || !!isPending?.[index]"
          :data-index="index"
          :aria-describedby="ariaDescribedby(index)"
          :aria-invalid="isAriaInvalid(index)"
          @change="onChange"
          @focus="onFocus"
        />
        <FormFieldRemoveFile
          :disabled="disabled"
          :files="files"
          :handle-change="handleChange"
          :id="control.id"
          :index="index"
          :is-pending="!!isPending?.[index]"
          :label-for="getIndexedId(index)"
          @removedFile="onFileRemoved"
        />
      </div>
      <FormFieldAddFileButton
        v-if="showAddFileButton(index)"
        @add-file="onAddFileInput"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ValidationError, Control } from '@shared/types/field'
import type { FileType } from '@shared/types/form'

import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useA11yStore } from '@shared/store/useA11yStore'

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
  resetError: () => void
  id: string
  placeholder?: string
  type: InputType
  value?: string
  error: ValidationError | null
  errors: string
  isPending?: boolean[]
}

const props = defineProps<Props>()

const { t } = useI18n()
const a11yStore = useA11yStore()

const addFileCount = ref<number>(0)

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
  const keys = Array.from({ length: count }).keys()

  return [...keys]
})

function getIndexedId(index: number): string {
  return a11yStore.getA11yInputId(props.control.id, index)
}

function ariaDescribedby(index: number): string {
  const errorId = a11yStore.getA11yErrorId(props.control.id, index)
  const explanationId = a11yStore.getA11yExplanationId(props.control.id)
  const validationId = a11yStore.getA11yValidationId(props.control.id, index)

  const error = isAriaInvalid(index) ? errorId : null
  const validation = isAriaInvalid(index) ? null : validationId

  return [explanationId, error, validation].filter(Boolean).join(' ').trim()
}

function isAriaInvalid(index: number): string | undefined {
  const id = getIndexedId(index)
  return props.error?.id === id ? 'true' : undefined
}

function showAddFileButton(index: number) {
  return index + 1 === numberOfFiles.value.length && index + 1 !== maxFiles.value
}

/**
 * Lower the add file count when a file is removed
 * This will remove the input field
 */
function onFileRemoved(index: number): void {
  const id = getIndexedId(index)
  a11yStore.removeId(id)
  if (isAriaInvalid(index)) {
    props.resetError()
  }

  addFileCount.value = Math.max(addFileCount.value - 1, 1)
  emit('blur')
}

function onChange(event: InputEvent): void {
  if (!(event.target instanceof HTMLInputElement)) {
    return
  }

  const file = event.target?.files?.[0]
  const { maxFileSize } = props

  // file exceeds maxFileSize
  if (file && maxFileSize && file.size > maxFileSize) {
    event.preventDefault()
    const size = formatFileSize(maxFileSize)

    emit('error', {
      message: t('form.fields.error.maxFileSize', { maxFileSize: size }),
      id: event.target.id
    })

    return
  }

  emit('change', event)
}

function onFocus(event: InputEvent): void {
  emit('focus', event)
}

function onAddFileInput(): void {
  addFileCount.value++
}

onMounted(() => (addFileCount.value = numberOfFilesAdded.value || 1))
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

  input[aria-invalid='true'] {
    background-color: var(--notification-error-background-color);
    border-color: var(--notification-error-border-color);
  }
}
</style>
