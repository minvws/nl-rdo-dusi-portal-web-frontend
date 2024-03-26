import type { Ref } from 'vue'
import type { ValidationError } from '@shared/types/field'
import type { FileType } from '@shared/types/form'
import type { CustomFetch } from '@shared/types/fetch'
import { ProjectType } from '@shared/types/project'
import { CustomFetchType } from '@shared/types/fetch'
import { NotificationType } from '@shared/types/notification'

import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useFormStorage } from '@shared/store/useFormStorage'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useEncryption } from '@shared/composables/useEncryption'
import { useForms } from '@shared/composables/form/useForms'
import { useFormSubmit } from '@shared/composables/form/useFormSubmit'

import { log } from '@shared/utils/logger'
import { getControlId } from '@shared/utils/control'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY
const isPortal = import.meta.env.VITE_PROJECT === ProjectType.PORTAL

export const useFileStore = defineStore('useFileStore', () => {
  const notificationsStore = useNotificationsStore()
  const formStore = useFormStorage()
  const { t } = useI18n()
  const form = useForms()
  const router = useRouter()
  const { onSubmitValidation } = useFormSubmit()
  const { encrypt } = useEncryption()

  const { storage } = storeToRefs(formStore)

  const { activeForm, activeFormId, activeInputStageForm, draftId } = form
  const { currentRoute } = router

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
    const formId = activeFormId.value

    // initialize pending state
    if (pending.value[formId] === undefined) {
      pending.value[formId] = {}
    }

    const pendingState = pending.value[formId]
    const filesPending = [...(pendingState?.[name] || [])]

    filesPending[index] = true
    pendingState[name] = filesPending

    await saveFile({ fieldName: name, file, index, errorRef: error }).finally(() => {
      if (isPortal) {
        const name = getControlId(id)
        // TODO: Only do submit validation if really needed ...
        onSubmitValidation(name)
      }
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

  function clear(id: string): void {
    delete pending.value[id]
  }

  function clearAll() {
    pending.value = {}
  }

  function isUploadPending(id: string): boolean[] {
    const formId = form.activeForm.value?.id
    if (!formId) {
      return []
    }

    const name = getControlId(id)
    return pending.value[activeFormId.value]?.[name]
  }

  function removeFile(name: string, index = 0): void {
    onFileRemoved({ fieldName: name, index })
    if (isPortal) {
      onSubmitValidation(name) // TODO: Only run validation if really needed ...
    }
  }

  async function saveFile({ errorRef, fieldName, file, index }: SaveFileProps): Promise<void> {
    const id = getId()
    const url = useApiFileUrl(id, fieldName)
    const fetchType = isPortal ? CustomFetchType.ENCRYPTION : CustomFetchType.CREDENTIALS

    try {
      const requestBody = await getRequestBody({ fetchType, file })
      const options: RequestInit = {
        method: 'POST',
        body: requestBody
      }
      const { data, error, statusCode } = await useCustomFetch(fetchType, url, options).json()
      const id = data.value?.id
      const errorMessage = error?.value?.message ?? data.value?.message

      if (id) {
        return onFileUploaded({ fieldName, file, index, data: data.value })
      }

      if (errorMessage) {
        throw new Error(errorMessage)
      }

      if (statusCode.value === 400) {
        notificationsStore.add({
          id: 'file-upload-failed',
          displayAs: NotificationType.ERROR,
          label: t('files.upload_failed.label') ?? '',
          message: t('files.upload_failed.message') ?? '',
          pageChangeCount: 1,
          dismissable: true
        })
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

  function onFileUploaded({ data, fieldName, file, index }: FileUploadProps): void {
    const { index: formIndex } = form
    const activeForm = storage.value[activeFormId.value]
    const currentFormData = activeForm.data[formIndex.value] || {}
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

    activeForm.data[formIndex.value] = updatedFormData
  }

  function onFileRemoved({ fieldName, index }: { fieldName: string; index: number }): void {
    const { index: formIndex } = form
    const activeForm = storage.value[activeFormId.value]
    const currentFormData = activeForm.data[formIndex.value] || {}
    const target = (currentFormData[fieldName] as FileType[]) || []

    target.splice(index, 1)

    const updatedFormData = {
      ...currentFormData,
      [fieldName]: target
    }

    activeForm.data[formIndex.value] = updatedFormData
  }

  function getId(): string | undefined {
    if (isPortal) {
      return draftId.value
    }

    const applicationId = activeInputStageForm.value?.metadata?.application?.id
    const stageId = activeInputStageForm.value?.metadata?.applicationStage?.id

    return `${applicationId}/stages/${stageId}`
  }

  async function getRequestBody({ fetchType, file }: { fetchType: CustomFetch; file: File }) {
    if (fetchType === CustomFetchType.ENCRYPTION) {
      const arrayBuffer = await file.arrayBuffer()
      const fileData = new Uint8Array(arrayBuffer)

      return encrypt(publicKey, fileData)
    }

    const data = new FormData()
    data.append('file', file)

    return data
  }

  return {
    addFile,
    addOrRemoveFile,
    clear,
    clearAll,
    isUploadPending,
    pending,
    removeFileByIdAndIndex
  }
})
