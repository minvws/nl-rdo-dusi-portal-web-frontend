import type { ComputedRef } from 'vue'
import type { FileType } from '@shared/types/form'
import type { CustomFetch } from '@shared/types/fetch'
import { ProjectType } from '@shared/types/project'
import { CustomFetchType } from '@shared/types/fetch'

import { useApiFileUrl } from '@shared/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useEncryption } from '@shared/composables/useEncryption'
import { useForms } from '@shared/composables/form/useForms'

import { log } from '@shared/utils/logger'
import { t } from '@shared/i18n'
import { usePendingFileStore } from '@shared/store/usePendingFileStore'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY
const isPortal = import.meta.env.VITE_PROJECT === ProjectType.PORTAL

export const useFileField = () => {
  const form = useForms()
  const { encrypt } = useEncryption()
  const { setPending, getPending, clearPending } = usePendingFileStore()

  const { activeForm, activeFormId, activeInputStageForm, reference } = form

  type FileFieldProps = {
    fieldName: string
    index: number
  }

  type AddFileProps = FileFieldProps & {
    file: File
  }

  type SaveFileProps = {
    fieldName: string
    file: File
  }

  type FileUploadProps = {
    data: { id: string }
    file: File
  }

  async function addFile({ file, index, fieldName }: AddFileProps): Promise<FileType> {
    const formId = activeFormId.value

    setPending({ formId, fieldName }, index)

    return await saveFile({ fieldName, file })
      .finally(() => {
        clearPending({ formId, fieldName }, index)
      })
  }

  function isUploadPending(fieldName: string): ComputedRef<boolean[]> {
    const formId = activeForm.value?.id
    return getPending({ formId, fieldName })
  }

  async function saveFile({
    fieldName,
    file
  }: SaveFileProps): Promise<FileType> {
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
        return onFileUploaded({ file, data: data.value })
      }

      if (errorMessage && statusCode.value === 422) {
        throw new Error(errorMessage)
      }

      throw new Error(undefined)
    } catch (error: any) {
      log(error)
      throw new Error(error?.message || t('form.fields.error.upload'))
    }
  }

  function onFileUploaded({ data, file }: FileUploadProps): FileType {
    const { type: mimeType, name } = file

    return {
      id: data.id,
      mimeType,
      name
    }
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
    isUploadPending
  }
}

export function addFileToFileList(
  fileList: (FileType | undefined)[],
  file: FileType,
  index: number
): (FileType | undefined)[] {
  const target = [...fileList]
  target[index] = file

  return target
}

export function removeFileFromFileList(
  fileList: (FileType | undefined)[],
  index: number,
  hasErrorOrPending: boolean = false
): (FileType | undefined)[] {
  let target = [...fileList]
  if (target.length <= index) {
    return target;
  }

  if (
    target.length >= 1
    && (index + 1) < target.length
    && (hasErrorOrPending)
  ) {
    // set field value to undefined when there is an error on file upload
    // only if there are more files in the array and not the last one
    target[index] = undefined
  } else {
    target.splice(index, 1)
  }

  const fileItems = target.filter((item) => item !== undefined)
  if (fileItems.length === 0 && fileItems.length !== target.length) {
    // prevent array from having only undefined items
    target = []
  }

  return target
}
