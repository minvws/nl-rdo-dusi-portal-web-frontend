import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { getControlId } from '@shared/utils/control'
import { useForms } from '@shared/composables/form/useForms'
import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { translate } from '@shared/i18n'
import { log } from '@shared/utils/logger'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useEncryption } from '@shared/composables/useEncryption'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY

export const useFileStore = defineStore('useFileStore', () => {
  const files = ref({} as Record<string, Record<string, File>>)
  const pending = ref({} as Record<string, Record<string, boolean>>)
  const form = useForms()

  async function addFile(name: string, file: File, error?: Ref<string>) {
    const { id } = form.activeForm.value
    const currentFiles = files.value[id] || {}

    // Use object spread syntax to assign the file to the specific name
    const updatedFiles = {
      ...currentFiles,
      [name]: file
    }

    files.value[id] = updatedFiles
    pending.value[id] = { ...pending.value[id], [name]: true }
    await saveFile(name, file, error)
    delete pending.value[id][name]
  }

  function addOrRemoveFile(id: string, target?: HTMLInputElement, error?: Ref<string>) {
    const file = target?.files?.[0]
    const name = getControlId(id)
    if (file) addFile(name, file, error)
    else removeFile(name)
  }

  function clearFiles(id: string) {
    delete files.value[id]
    delete pending.value[id]
  }

  function getFile(id: string) {
    const { id: formId } = form.activeForm.value
    const name = getControlId(id)
    return files.value[formId]?.[name]
  }

  function isUploadPending(id: string) {
    const { id: formId } = form.activeForm.value
    const name = getControlId(id)
    return !!pending.value[formId]?.[name]
  }

  function removeFile(name: string) {
    const { id } = form.activeForm.value
    const target = files.value?.[id]
    if (!target) return
    delete target[name]
    // @TODO: remove file from server
    // deleteFile(id)
  }

  async function saveFile(id: string, file: File, error?: Ref<string>) {
    const { draftId } = form
    const url = useApiFileUrl(draftId.value, id)

    const { encrypt } = useEncryption()

    try {
      const fileData = new Uint8Array(await file.arrayBuffer())
      const encryptedData = await encrypt(publicKey, fileData)
      const { data } = await useFetchWithCredentials(url).post(encryptedData).json()
      if (data.value?.id) {
        onFileUpload({ id, file, data: data.value })
        return onFileUpload({ id, file, data: data.value })
      }
      throw new Error(data?.value?.message)
    } catch (errorResponse) {
      log(errorResponse)
      if (!errorResponse || !error) return
      error.value = translate('form.fields.error.upload') ?? ''
      return undefined
    }
  }

  // async function deleteFile(id: string) {
  //   const { draftId } = form
  //   const url = useApiFileUrl(draftId.value)
  //   const options: RequestInit = {
  //     method: 'DELETE',
  //     credentials: 'include'
  //   }

  //   const response = await fetch(url, options)
  //   log(response)
  // }

  function onFileUpload({ id, file, data }: { id: string; file: File; data: { id: string } }) {
    const { index, activeForm } = form
    const currentFormData = activeForm.value.data[index.value] || {}
    const { type: mimeType, name } = file

    const updatedFormData = {
      ...currentFormData,
      [id]: [
        {
          id: data.id,
          mimeType,
          name
        }
      ]
    }

    activeForm.value.data[index.value] = updatedFormData
  }

  return {
    addFile,
    addOrRemoveFile,
    clearFiles,
    files,
    pending,
    getFile,
    isUploadPending
  }
})
