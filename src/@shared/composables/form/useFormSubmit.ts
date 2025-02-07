import type { ApplicationForm } from '@shared/types/cases'
import type { CustomFetch } from '@shared/types/fetch'
import type { FormSubmit, FormSubmitError, FormSubmitReturnType } from '@shared/types/form'
import type { Ref } from 'vue'

import { CustomFetchType } from '@shared/types/fetch'
import { FormSubmitType } from '@shared/types/form'
import { ProjectType } from '@shared/types/project'

import { computed, ref } from 'vue'
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

type ShowNotificationType = {
  type: FormSubmit
  error?: FormSubmitError
}

type SubmitType = {
  submitType: FormSubmit
  fetchType: CustomFetch
}

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
    const { reference } = forms
    const formData = forms.getFormData()

    switch (type) {
      case FormSubmitType.SUBMIT:
      case FormSubmitType.DRAFT: {
        return {
          method: 'PUT',
          url: useApiFormsSubmitUrl(reference.value),
          data: formData,
          submit: type === FormSubmitType.SUBMIT
        }
      }
      case FormSubmitType.VALIDATION: {
        const id = getValidationId()
        return {
          method: 'PATCH',
          data: formData,
          url: useApiFormsValidateUrl(id)
        }
      }
      case FormSubmitType.ACTION: {
        const id = getActionId()
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

  async function onSubmit({ submitType, fetchType }: SubmitType): Promise<FormSubmitReturnType> {
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

    const statusCodeRef = ref<number | null>(null)
    const isValidationError = computed<boolean>(() => statusCodeRef.value === 422)

    try {
      const { data, error, statusCode } = await useCustomFetch(fetchType, url, options).json()
      const errorMessage = error?.value?.message ?? data.value?.message
      statusCodeRef.value = statusCode.value

      setFetchFormResults({ type: submitType, data, error })

      if (isValidationError.value) {
        return {
          data: error,
          statusCode: statusCode.value,
          error: { isValidationError: isValidationError.value }
        }
      }

      if (errorMessage) {
        throw new Error(errorMessage)
      }

      return { data, statusCode: statusCode.value }
    } catch (error) {
      log(error)
      return {
        data: undefined,
        error: { error: error as Error, isValidationError: isValidationError.value },
        statusCode: statusCodeRef.value
      }
    } finally {
      forms.setSubmitting(false)
    }
  }

  function getValidationId(): string | undefined {
    const id = forms.reference.value || forms.formId.value
    return isPortal ? id : currentRoute.value.params.id.toString()
  }

  function getActionId(): string | undefined {
    const id = forms.reference.value || forms.formId.value
    return isPortal ? id : currentRoute.value.params.id.toString()
  }

  async function getRequestBody({ fetchType, body }: { fetchType: CustomFetch; body: any }) {
    const string = JSON.stringify(body)

    return fetchType === CustomFetchType.ENCRYPTION ? encrypt(publicKey, string) : string
  }

  function showNotification({ type, error }: ShowNotificationType): void {
    if (error) {
      notification.showError({ type, error })
      return
    }

    notification.showSuccess(type)
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

  async function onSubmitValidation(fieldName?: string): Promise<void> {
    const submitType = FormSubmitType.VALIDATION
    const fetchType = CustomFetchType.ENCRYPTION

    if (fieldName) {
      forms.setFieldIsValidating(fieldName)
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
        if (statusCode === 200) {
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
