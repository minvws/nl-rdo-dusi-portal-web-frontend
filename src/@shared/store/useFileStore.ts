import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getControlId } from '@shared/utils/control'

import { useFormStore } from '@shared/store/useFormStore'
import { useApiFileUrl } from '@shared/composables/usePortalApiUrl'
import { log } from '@shared/utils/logger'

// Define the store
export const useFileStore = defineStore('useFileStore', () => {
  const files = ref({} as Record<string, Record<string, File>>)

  const formStore = useFormStore()

  function addFile(name: string, file: File) {
    const { id } = formStore.activeForm
    const currentFiles = files.value[id] || {}

    // Use object spread syntax to assign the file to the specific name
    const updatedFiles = {
      ...currentFiles,
      [name]: file
    }

    files.value[id] = updatedFiles

    saveFile(name, file)
  }

  function addOrRemoveFile(id: string, target?: HTMLInputElement) {
    const file = target?.files?.[0]
    const name = getControlId(id)

    file ? addFile(name, file) : removeFile(name)
  }

  function clearFiles(id: string) {
    delete files.value[id]
  }

  function getFile(id: string) {
    const formId = formStore.activeForm.id
    const name = getControlId(id)

    return files.value[formId]?.[name]
  }

  function removeFile(name: string) {
    const { id } = formStore.activeForm
    delete files.value[id][name]

    // @TODO: remove file from server
    // deleteFile(id)
  }

  async function saveFile(name: string, file: File) {
    const { draftFormId } = formStore
    const url = useApiFileUrl(draftFormId as string)
    const body = new FormData()

    body.append('fieldCode', name)
    // @TODO: file should be encrypted before upload.
    body.append('file', file)

    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: body
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (data.id) {
        setFileId(name, data.id)
      }
    } catch (error) {
      log(error)
    }
  }

  // async function deleteFile(id: string) {
  //   const { draftFormId } = formStore
  //   const url = useApiFileUrl(draftFormId as string)
  //   const options: RequestInit = {
  //     method: 'DELETE',
  //     credentials: 'include'
  //   }

  //   const response = await fetch(url, options)
  //   log(response)
  // }

  function setFileId(name: string, id: string) {
    const { index } = formStore
    const currentFormData = formStore.activeForm.data[index] || {}

    const updatedFormData = {
      ...currentFormData,
      [name]: id
    }

    formStore.activeForm.data[index] = updatedFormData
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
