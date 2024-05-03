import type { Ref } from 'vue'
import type { ValidationError } from '@shared/types/field'
import type { FileType } from '@shared/types/form'
import type { CustomFetch } from '@shared/types/fetch'
import { ProjectType } from '@shared/types/project'
import { CustomFetchType } from '@shared/types/fetch'

import { useI18n } from 'vue-i18n'

import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useEncryption } from '@shared/composables/useEncryption'
import { useForms } from '@shared/composables/form/useForms'
import { useFormSubmit } from '@shared/composables/form/useFormSubmit'

import { log } from '@shared/utils/logger'
import { useA11yStore } from '@shared/store/useA11yStore'
import { usePendingFileStore } from '@shared/store/usePendingFileStore'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY
const isPortal = import.meta.env.VITE_PROJECT === ProjectType.PORTAL

export const useFileField = () => {
  const a11yStore = useA11yStore()
  const { t } = useI18n()
  const form = useForms()
  const { onSubmitValidation } = useFormSubmit()
  const { encrypt } = useEncryption()
  const { setPending, getPending, clearPending } = usePendingFileStore()

  const { activeForm, activeFormId, activeInputStageForm, reference, setFormData } = form

  type FileFieldProps = {
    fieldName: string
    index: number
  }

  type AddFileProps = FileFieldProps & {
    file: File
    id: string
    error?: Ref<ValidationError | null>
  }

  type AddOrRemoveFileProps = {
    id: string
    fieldName: string
    error?: Ref<ValidationError | null>
    target?: HTMLInputElement
  }

  type SaveFileProps = FileFieldProps & {
    errorRef?: Ref<ValidationError | null>
    fieldId: string
    file: File
  }

  type FileUploadProps = FileFieldProps & {
    data: { id: string }
    file: File
  }

  async function addFile({ file, id, index, fieldName, error }: AddFileProps): Promise<void> {
    const fieldId = a11yStore.getA11yInputId(id, index)
    const formId = activeFormId.value

    setPending({ formId, fieldName }, index)

    await saveFile({ fieldName, fieldId, file, index, errorRef: error })
      .catch(() => {
        // Removes the last successful file if there was one on that field
        removeFile({fieldName, index})
      })
      .finally(() => {
        if (isPortal) {
          // TODO: Only do submit validation if really needed ...
          onSubmitValidation(fieldName)
        }
      })

    clearPending({ formId, fieldName }, index)
  }

  function addOrRemoveFile({ id, fieldName, error, target }: AddOrRemoveFileProps): void {
    const file = target?.files?.[0]
    const index = Number.parseInt(target?.dataset.index || '0', 10)

    if (file) {
      addFile({ error, file, id, index, fieldName })
    } else {
      removeFile({ fieldName, index })
    }
  }

  function isUploadPending(fieldName: string): boolean[] {
    const formId = activeForm.value?.id
    if (!formId) {
      return []
    }
    return getPending({ formId, fieldName })
  }

  function removeFile({ fieldName, index = 0}: FileFieldProps): void {
    onFileRemoved({ fieldName, index })
    if (isPortal) {
      onSubmitValidation(fieldName) // TODO: Only run validation if really needed ...
    }
  }

  async function saveFile({
    errorRef,
    fieldName,
    fieldId,
    file,
    index
  }: SaveFileProps): Promise<void> {
    const reference = getId()
    const url = useApiFileUrl(reference, fieldName)
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

      if (errorMessage && statusCode.value === 422) {
        throw new Error(errorMessage)
      }

      if (errorMessage) {
        throw new Error(undefined)
      }
    } catch (error: any) {
      a11yStore.addId(fieldId)
      if (errorRef) {
        errorRef.value = {
          message: error?.message || t('form.fields.error.upload'),
          id: fieldId
        }
      }

      log(error)
      throw error
    }
  }

  function onFileUploaded({ data, fieldName, file, index }: FileUploadProps): void {
    const formData = form.data.value
    const target = (formData[fieldName] as FileType[]) || []

    const { type: mimeType, name } = file

    target[index] = {
      id: data.id,
      mimeType,
      name
    }

    const updatedFormData = {
      ...formData,
      [fieldName]: target
    }

    setFormData(updatedFormData)
  }

  function onFileRemoved({ fieldName, index }: { fieldName: string; index: number }): void {
    const formData = form.data.value
    const target = (formData[fieldName] as (FileType | undefined)[]) || []

    if (target.length > index + 1) {
      // clear the file from list but keep the index
      target[index] = undefined
    } else {
      target.splice(index, 1)
    }

    const updatedFormData = {
      ...formData,
      [fieldName]: target
    }

    setFormData(updatedFormData)
  }

  function getId(): string | undefined {
    if (isPortal) {
      return reference.value
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
    isUploadPending,
    removeFile
  }
}
