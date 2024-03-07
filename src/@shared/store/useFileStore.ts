import type { Ref } from 'vue'
import type { ValidationError } from '@shared/types/field'
import type { FileType } from '@shared/types/form'

import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useForms } from '@shared/composables/form/useForms'
import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useEncryption } from '@shared/composables/useEncryption'
import { useFormSubmit } from '@shared/composables/form/useFormSubmit'

import { t } from '@shared/i18n'
import { log } from '@shared/utils/logger'
import { getControlId } from '@shared/utils/control'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY

export const useFileStore = defineStore('useFileStore', () => {
  const form = useForms()
  const { onSubmitValidation } = useFormSubmit()
  const { encrypt } = useEncryption()

  const files = ref<Record<string, Record<string, File[]>>>({})
  const pending = ref<Record<string, Record<string, boolean[]>>>({})

  type AddFileProps = {
    file: File
    id: string
    index: number
    name: string
    error?: Ref<ValidationError | null>
  }

  type AddOrRemoveFileProps = {
    id: string
    error?: Ref<ValidationError | null>
    target?: HTMLInputElement
  }

  type SaveFileProps = {
    errorRef?: Ref<ValidationError | null>
    fieldName: string
    file: File
    index: number
  }

  type FileUploadProps = {
    data: { id: string }
    fieldName: string
    file: File
    index: number
  }

  async function addFile({ file, id, index, name, error }: AddFileProps): Promise<void> {
    const formId = form.activeForm.value.id
    const currentFiles = files.value[formId] || {}
    let pendingState = pending.value[formId] || {}
    const target = currentFiles[name] ?? []
    const filesPending = [...(pendingState?.[name] || [])]
    const updatedFiles = {
      ...currentFiles,
      [name]: target
    }

    if (target[index]) {
      removeFile(name, index)
    }

    target[index] = file
    files.value[id] = updatedFiles

    if (!pendingState) {
      pendingState = {}
    }

    filesPending[index] = true
    Object.assign(pendingState, { [name]: filesPending })

    await saveFile({ fieldName: name, file, index, errorRef: error }).finally(() => {
      const name = getControlId(id)
      onSubmitValidation(name)
    })

    pendingState[name][index] = false
  }

  function addOrRemoveFile({ id, error, target }: AddOrRemoveFileProps): void {
    const file = target?.files?.[0]
    const index = Number.parseInt(target?.dataset.index || '0', 10)

    if (file) {
      const name = getControlId(id)
      addFile({ error, file, id, index, name })
    } else {
      removeFileByIdAndIndex(id, index)
    }
  }

  function removeFileByIdAndIndex(id: string, index: number): void {
    const name = getControlId(id)
    removeFile(name, index)
  }

  function clearFiles(id: string): void {
    delete files.value[id]
    delete pending.value[id]
  }

  function getFile(id: string, index: number): File {
    const { id: formId } = form.activeForm.value
    const name = getControlId(id)
    return files.value[formId]?.[name]?.[index]
  }

  function isUploadPending(id: string): boolean[] {
    const { id: formId } = form.activeForm.value
    const name = getControlId(id)
    return pending.value[formId]?.[name]
  }

  function removeFile(name: string, index = 0): void {
    const { id } = form.activeForm.value
    const target = files.value?.[id]
    if (!target?.[name]) return
    target[name].splice(index, 1)
  }

  async function saveFile({ errorRef, fieldName, file, index }: SaveFileProps): Promise<void> {
    const { draftId } = form
    const url = useApiFileUrl(draftId.value, fieldName)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const fileData = new Uint8Array(arrayBuffer)
      const encryptedData = await encrypt(publicKey, fileData)
      const options: RequestInit = {
        method: 'POST',
        body: encryptedData
      }
      const { data } = await useCustomFetch('with-encryption', url, options).json()
      const { id, message } = data.value

      if (id) {
        return onFileUpload({ fieldName, file, index, data: data.value })
      }

      if (message) {
        throw new Error(message)
      }
    } catch (error) {
      if (errorRef) {
        errorRef.value = {
          message: t('form.fields.error.upload') ?? '',
          id: fieldName
        }
      }

      log(error)
    }
  }

  function onFileUpload({ data, fieldName, file, index }: FileUploadProps): void {
    const { index: formIndex, activeForm } = form
    const currentFormData = activeForm.value.data[formIndex.value] || {}
    const target = (currentFormData[fieldName] as FileType[]) || []

    const { type: mimeType, name } = file

    target[index] = {
      id: data.id,
      mimeType,
      name
    }

    const updatedFormData = {
      ...currentFormData,
      [fieldName]: target
    }

    activeForm.value.data[formIndex.value] = updatedFormData
  }

  return {
    addFile,
    addOrRemoveFile,
    clearFiles,
    files,
    getFile,
    isUploadPending,
    pending,
    removeFileByIdAndIndex
  }
})
