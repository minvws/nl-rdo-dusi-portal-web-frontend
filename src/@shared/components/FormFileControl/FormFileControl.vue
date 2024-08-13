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
          :disabled="disabled || isPending[index]"
          :data-index="index"
          :aria-describedby="ariaDescribedby(index)"
          :aria-invalid="isAriaInvalid(index)"
          @change="onChange($event, index)"
          @focus="onFocus"
        />
        <FormFieldRemoveFile
          :disabled="disabled"
          :file="files[index]"
          :index="index"
          :is-pending="isPending[index] || false"
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

import FormTextControl from '@shared/components/FormTextControl/FormTextControl.vue'
import FormFieldRemoveFile from '@shared/components/FormFieldRemoveFile/FormFieldRemoveFile.vue'
import FormFieldAddFileButton from '@shared/components/FormFieldAddFileButton/FormFieldAddFileButton.vue'

import { InputType } from '@shared/types/input'
import { formatFileSize } from '@shared/utils/format'
import { getA11yErrorId, getA11yExplanationId, getA11yInputId, getA11yValidationId } from '@shared/utils/a11y'
import { addFileToFileList, removeFileFromFileList, useFileField } from '@shared/composables/useFileField'

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
  value?: (FileType | undefined)[]
  error?: ValidationError,
}

const props = defineProps<Props>()

const { t } = useI18n()
const { isUploadPending, addFile } = useFileField()

const addFileCount = ref<number>(0)

const files = computed<(FileType | undefined)[]>(() => props.value ?? [])

const isPending = isUploadPending(props.control.path)

const textControlProps = computed<{
  type: InputType
  control: Control
  value: string | undefined
  placeholder: string | undefined
  autofocus: boolean
}>(() => ({
  type: props.type,
  control: props.control,
  value: undefined,
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
  return getA11yInputId(props.control.id, index)
}

function ariaDescribedby(index: number): string {
  const errorId = getA11yErrorId(props.control.id, index)
  const explanationId = getA11yExplanationId(props.control.id)
  const validationId = getA11yValidationId(props.control.id, index)

  return [errorId, validationId, explanationId].join(' ')
}

function isAriaInvalid(index: number): boolean | undefined {
  const id = getIndexedId(index)

  if (!props.error) {
    return undefined
  }

  if (props.error?.id === undefined) {
    return true
  }

  return props.error?.id === id ? true : undefined
}

function showAddFileButton(index: number) {
  return index + 1 === numberOfFiles.value.length && index + 1 !== maxFiles.value
}

/**
 * Lower the add file count when a file is removed
 * This will remove the input field
 *
 * When having a pending upload the file count will stay the same
 * to keep the input field but file will be removed
 */
function onFileRemoved(index: number): void {
  props.resetError()

  const hasPending = isPending.value.some((pending) => pending)

  const newFiles = removeFileFromFileList(files.value, index, hasPending)
  props.handleChange(props.control.path, newFiles)

  if (hasPending) {
    return
  }

  addFileCount.value = Math.max(addFileCount.value - 1, 1)
  emit('blur')
}

function onChange(event: InputEvent, index: number): void {
  if (!(event.target instanceof HTMLInputElement)) {
    return
  }

  event.preventDefault()

  const file = event.target?.files?.[0]
  const { maxFileSize } = props

  if (!file) {
    emit('error', {
      message: t('form.fields.error.upload'),
      id: event.target.id
    })

    return
  }

  // file exceeds maxFileSize
  if (maxFileSize && file.size > maxFileSize) {
    const size = formatFileSize(maxFileSize)

    // Removes the last successful file if there was one on that field
    const newFiles = removeFileFromFileList(files.value, index, true)
    props.handleChange(props.control.path, newFiles)

    emit('error', {
      message: t('form.fields.error.maxFileSize', { maxFileSize: size }),
      id: event.target.id
    })
    return
  }

  addFile({ index, fieldName: props.control.path, file })
    .then((data) => {
      // Set new value
      const newFiles = addFileToFileList(files.value, data, index)
      props.handleChange(props.control.path, newFiles)

      emit('change', event)
    })
    .catch((error) => {
      // Removes the last successful file if there was one on that field
      const newFiles = removeFileFromFileList(files.value, index, true)
      props.handleChange(props.control.path, newFiles)

      emit('error', {
        message: error.message,
        id: (event.target as HTMLInputElement).id
      })
    })
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
