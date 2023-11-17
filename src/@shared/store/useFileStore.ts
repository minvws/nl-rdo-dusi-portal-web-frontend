import type { Ref } from 'vue'

import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useForms } from '@shared/composables/form/useForms'
import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'
import { useEncryption } from '@shared/composables/useEncryption'

import { translate } from '@shared/i18n'
import { log } from '@shared/utils/logger'
import { getControlId } from '@shared/utils/control'
import type { FileType } from '../types/form'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY

export const useFileStore = defineStore('useFileStore', () => {
  const form = useForms()
  const { encrypt } = useEncryption()

  const files: Ref<Record<string, Record<string, File[]>>> = ref({})
  const pending: Ref<Record<string, Record<string, boolean[]>>> = ref({})

  async function addFile(name: string, file: File, index: number, error?: Ref<string>) {
    const { id } = form.activeForm.value
    const currentFiles = files.value[id] || {}
    const target = currentFiles[name] ?? []

    if (target[index]) removeFile(name, index)

    target[index] = file
    const updatedFiles = {
      ...currentFiles,
      [name]: target
    }

    files.value[id] = updatedFiles

    const filesPending = [...(pending.value[id]?.[name] || [])]
    if (!pending.value[id]) pending.value[id] = {}
    filesPending[index] = true
    Object.assign(pending.value[id], { [name]: filesPending })
    await saveFile(name, file, index, error)
    pending.value[id][name][index] = false
  }

  function addOrRemoveFile(id: string, target?: HTMLInputElement, error?: Ref<string>) {
    const file = target?.files?.[0]
    const index = parseInt(target?.dataset.index || '0')
    if (file) {
      const name = getControlId(id)
      addFile(name, file, index, error)
    } else removeFileByIdAndIndex(id, index)
  }

  function removeFileByIdAndIndex(id: string, index: number) {
    const name = getControlId(id)
    removeFile(name, index)
  }

  function clearFiles(id: string) {
    delete files.value[id]
    delete pending.value[id]
  }

  function getFile(id: string, index: number) {
    const { id: formId } = form.activeForm.value
    const name = getControlId(id)
    return files.value[formId]?.[name]?.[index]
  }

  function isUploadPending(id: string) {
    const { id: formId } = form.activeForm.value
    const name = getControlId(id)
    return pending.value[formId]?.[name]
  }

  function removeFile(name: string, index = 0) {
    const { id } = form.activeForm.value
    const target = files.value?.[id]
    if (!target?.[name]) return
    target[name].splice(index, 1)
  }

  const fakeCall = (file: File) => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({ data: { value: { id: file.name } } })
      }, 1000)
    })
  }

  async function saveFile(id: string, file: File, index: number, error?: Ref<string>) {
    const { draftId } = form
    const url = useApiFileUrl(draftId.value, id)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const fileData = new Uint8Array(arrayBuffer)
      const encryptedData = await encrypt(publicKey, fileData)
      const { data } = await fakeCall(file) // await useFetchWithEncryption(url).post(encryptedData).json()
      if (data.value?.id) {
        return onFileUpload({ id, file, index, data: data.value })
      }
      throw new Error(data?.value?.message)
    } catch (errorResponse) {
      log(errorResponse)
      if (!errorResponse || !error) return
      error.value = translate('form.fields.error.upload') ?? ''
      return undefined
    }
  }


  function onFileUpload({
    id,
    file,
    index,
    data
  }: {
    id: string
    file: File
    index: number
    data: { id: string }
  }) {
    const { index: formIndex, activeForm } = form
    const currentFormData = activeForm.value.data[formIndex.value] || {}
    const target = (currentFormData[id] as FileType[]) || []

    const { type: mimeType, name } = file

    target[index] = {
      id: data.id,
      mimeType,
      name
    }
    const updatedFormData = {
      ...currentFormData,
      [id]: target
    }
    activeForm.value.data[formIndex.value] = updatedFormData
  }

  return {
    addFile,
    addOrRemoveFile,
    removeFileByIdAndIndex,
    clearFiles,
    files,
    pending,
    getFile,
    isUploadPending
  }
})
