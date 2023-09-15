import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { getControlId } from '@shared/utils/control'
import { useForms } from '@shared/composables/form/useForms'
import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { translate } from '@shared/i18n'
import { log } from '@shared/utils/logger'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

export const useFileStore = defineStore('useFileStore', () => {
  const files = ref({} as Record<string, Record<string, File>>)
  const form = useForms()

  function addFile(name: string, file: File, error?: Ref<string>) {
    const { id } = form.activeForm.value
    const currentFiles = files.value[id] || {}

    // Use object spread syntax to assign the file to the specific name
    const updatedFiles = {
      ...currentFiles,
      [name]: file
    }

    files.value[id] = updatedFiles
    return saveFile(name, file, error)
  }

  function addOrRemoveFile(id: string, target?: HTMLInputElement, error?: Ref<string>) {
    const file = target?.files?.[0]
    const name = getControlId(id)
    if (file) return addFile(name, file, error)
    return removeFile(name)
  }

  function clearFiles(id: string) {
    delete files.value[id]
  }

  function getFile(id: string) {
    const { id: formId } = form.activeForm.value
    const name = getControlId(id)
    return files.value[formId]?.[name]
  }

  function removeFile(name: string) {
    const { id } = form.activeForm.value
    delete files.value[id][name]

    // @TODO: remove file from server
    // deleteFile(id)
  }

  async function saveFile(id: string, file: File, error?: Ref<string>) {
    const { draftId } = form
    const url = useApiFileUrl(draftId.value, id)

    // @TODO: file should be encrypted before upload.

    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: file
    }

    try {
      const { data } = await useFetchWithCredentials(url, options).json()
      if (data.value?.id) {
        onFileUpload({ id, file, data: data.value })
        return  onFileUpload({ id, file, data: data.value })
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

    const result = [
      {
        id: data.id,
        mimeType,
        name
      }
    ]
    const updatedFormData = {
      ...currentFormData,
      [id]: result
    }

    activeForm.value.data[index.value] = updatedFormData

    return result
  }

  return {
    addFile,
    addOrRemoveFile,
    clearFiles,
    files,
    getFile,
    saveFile
  }
})
