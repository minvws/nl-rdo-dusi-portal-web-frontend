import type { ApplicationForm } from '@shared/types/cases'
import type { CustomFetch } from '@shared/types/fetch'
import type { FormSubmit } from '@shared/types/form'
import type { Ref } from 'vue'
import { CustomFetchType } from '@shared/types/fetch'
import { FormSubmitType } from '@shared/types/form'
import { ProjectType } from '@shared/types/project'

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useValidationStore } from '@shared/store/useValidationStore'
import { useActionsStore } from '@portal/store/useActionsStore'

import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useApiFormsSubmitUrl, useApiFormsValidateUrl } from '@shared/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useEncryption } from '@shared/composables/useEncryption'
import { useFormSubmitNotification } from '@shared/composables/form/useFormSubmitNotification'

import { HOME } from '@shared/router/names'
import { log } from '@shared/utils/logger'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY
const isPortal = import.meta.env.VITE_PROJECT === ProjectType.PORTAL

type SetFetchFormResultsType = {
  type: FormSubmit
  data?: Ref
  error?: Ref
}

type SubmitValueType = {
  type: FormSubmit
  statusCode: Ref<number | null>
  data?: Ref
  error?: Ref
}

type SubmitValueReturnType = {
  data: Ref<any> | undefined
  statusCode: Ref<number | null>
}

type ShowNotificationType = {
  type: FormSubmit
  error?: Error
}

type SubmitType = {
  submitType: FormSubmit
  fetchType: CustomFetch
}

type SubmitReturnType = Promise<{
  data?: any
  error?: Error
  statusCode?: any
}>

export const useFormSubmit = () => {
  const forms = useActiveForm()
  const notification = useFormSubmitNotification()
  const router = useRouter()
  const { currentRoute } = router
  const { encrypt } = useEncryption()

  const actionStore = useActionsStore()
  const validationStore = useValidationStore()
  const { canContinueAfterValidation } = storeToRefs(validationStore)

  function getRequest(type: FormSubmit) {
    const { draftId } = forms
    const formData = forms.getFormData()

    switch (type) {
      case FormSubmitType.SUBMIT:
      case FormSubmitType.DRAFT: {
        return {
          method: 'PUT',
          url: useApiFormsSubmitUrl(draftId.value),
          data: formData,
          submit: type === FormSubmitType.SUBMIT
        }
      }
      case FormSubmitType.VALIDATION: {
        const id = getId()
        return {
          method: 'PATCH',
          data: formData,
          url: useApiFormsValidateUrl(id)
        }
      }
      case FormSubmitType.ACTION: {
        const id = getId()
        return {
          data: formData,
          method: 'PATCH',
          url: useApiFormsValidateUrl(id)
        }
      }
      default: {
        throw new Error(`FormSubmit ${type} is unknown`)
      }
    }
  }

  async function onSubmit({ submitType, fetchType }: SubmitType): SubmitReturnType {
    const { method, url, ...body } = getRequest(submitType)
    const requestBody = await getRequestBody({ fetchType, body })
    const options: RequestInit = {
      body: requestBody,
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      method
    }

    forms.setSubmitting(true)

    try {
      const fetch = await useCustomFetch(fetchType, url, options).json()
      const { data, error, statusCode } = fetch
      const errorMessage = error?.value?.message ?? data.value?.message

      setFetchFormResults({ type: submitType, data, error })

      if (errorMessage) {
        throw new Error(errorMessage)
      }

      return returnBySubmitType({ type: submitType, statusCode, data, error })
    } catch (error) {
      log(error)
      return { error: error as Error }
    } finally {
      forms.setSubmitting(false)
    }
  }

  function getId(): string | undefined {
    return isPortal ? forms.draftId.value : currentRoute.value.params.id.toString()
  }

  async function getRequestBody({ fetchType, body }: { fetchType: CustomFetch; body: any }) {
    const string = JSON.stringify(body)

    return fetchType === CustomFetchType.ENCRYPTION ? encrypt(publicKey, string) : string
  }

  function showNotification({ type, error }: ShowNotificationType): void {
    error ? notification.showError({ type, error }) : notification.showSuccess(type)
  }

  function setFetchFormResults({ type, data, error }: SetFetchFormResultsType): void {
    const isActionType = type === FormSubmitType.ACTION

    if (isPortal && isActionType) {
      const values = data?.value.data
      forms.setActionResult({ values })
    }

    if (!isPortal && isActionType) {
      const stages = data?.value.data.applicationStages
      const values = stages.find(
        (stage: ApplicationForm) => stage.metadata.applicationStage.isCurrent
      )

      if (values.data) {
        forms.setActionResult({ values: values.data })
      }
    }

    const validationResult = error?.value?.validationResult ?? data?.value?.validationResult
    forms.setValidationResult({ validationResult })
  }

  function returnBySubmitType({
    type,
    statusCode,
    data,
    error
  }: SubmitValueType): SubmitValueReturnType {
    const isValidationError = statusCode.value === 422 && type === FormSubmitType.VALIDATION

    if (isValidationError) {
      return { data: error, statusCode }
    }

    return { data, statusCode }
  }

  async function onSubmitAction(): Promise<void> {
    const submitType = FormSubmitType.ACTION
    const fetchType = isPortal ? CustomFetchType.ENCRYPTION : CustomFetchType.CREDENTIALS

    await onSubmit({ submitType, fetchType })
  }

  async function onSubmitForm(): Promise<void> {
    const submitType = FormSubmitType.SUBMIT
    const fetchType = CustomFetchType.ENCRYPTION
    const { error } = await onSubmit({ submitType, fetchType })

    showNotification({ type: submitType, error })

    if (error) {
      return
    }

    if (isPortal) {
      actionStore.getActionsCount()
    }

    forms.clearForm()
    router.replace({ name: HOME })
  }

  async function onSubmitDraft(): Promise<void> {
    const submitType = FormSubmitType.DRAFT
    const fetchType = CustomFetchType.ENCRYPTION
    const { error } = await onSubmit({ submitType, fetchType })

    showNotification({ type: submitType, error })
  }

  async function onSubmitValidation(id?: string): Promise<void> {
    const submitType = FormSubmitType.VALIDATION
    const fetchType = CustomFetchType.ENCRYPTION

    if (id) {
      forms.setIdIsValidating(id)
    }

    forms.setValidatingIsPending(true)

    await onSubmit({ submitType, fetchType }).finally(() => forms.setValidatingIsPending(false))
  }

  async function onSubmitValidationOrContinue(): Promise<void> {
    const submitType = FormSubmitType.VALIDATION
    const fetchType = CustomFetchType.ENCRYPTION
    const { activeForm } = forms

    forms.setValidatingIsPending(true)

    await onSubmit({ submitType, fetchType })
      .then(({ statusCode }) => {
        if (statusCode?.value === 200) {
          canContinueAfterValidation.value = true
          activeForm.value.index = forms.index.value + 1
        } else {
          canContinueAfterValidation.value = false
        }
      })
      .finally(() => {
        forms.setValidatingIsPending(false)
        canContinueAfterValidation.value = false
      })
  }

  return {
    onSubmitAction,
    onSubmitDraft,
    onSubmitForm,
    onSubmitValidation,
    onSubmitValidationOrContinue
  }
}
