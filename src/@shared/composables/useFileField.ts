import type { Ref } from 'vue'
import type { ValidationError } from '@shared/types/field'
import type { FileType } from '@shared/types/form'
import type { CustomFetch } from '@shared/types/fetch'
import { ProjectType } from '@shared/types/project'
import { CustomFetchType } from '@shared/types/fetch'

import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useEncryption } from '@shared/composables/useEncryption'
import { useForms } from '@shared/composables/form/useForms'
import { useFormSubmit } from '@shared/composables/form/useFormSubmit'

import { log } from '@shared/utils/logger'
import { usePendingFileStore } from '@shared/store/usePendingFileStore'
import { getA11yInputId } from '@shared/utils/a11y'
import { t } from '@shared/i18n'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY
const isPortal = import.meta.env.VITE_PROJECT === ProjectType.PORTAL

export const useFileField = () => {
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
    const fieldId = getA11yInputId(id, index)
    const formId = activeFormId.value

    setPending({ formId, fieldName }, index)

    await saveFile({ fieldName, fieldId, file, index, errorRef: error })
      .catch(() => {
        // Removes the last successful file if there was one on that field
        removeFile({fieldName, index}, true)
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

  function removeFile({ fieldName, index = 0}: FileFieldProps, hasError: boolean = false): void {
    onFileRemoved({ fieldName, index }, hasError)
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

  function onFileRemoved({ fieldName, index }: FileFieldProps, hasError: boolean = false): void {
    const formData = form.data.value
    const target = (formData[fieldName] as (FileType | undefined)[]) || []
    if (target.length <= index) {
      return;
    }

    if (
      target.length >= 1
      && (index + 1) < target.length
      && hasError
    ) {
      // set field value to undefined when there is an error on file upload
      // only if there are more files in the array and not the last one
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
