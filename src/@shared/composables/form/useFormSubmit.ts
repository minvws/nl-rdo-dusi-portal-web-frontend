import type { Ref } from 'vue'
import type { FormSubmitType } from '@shared/types/form'

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useValidationStore } from '@shared/store/useValidationStore'
import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useEncryption } from '@shared/composables/useEncryption'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'
import { useApiFormsSubmitUrl, useApiFormsValidateUrl } from '@shared/composables/useApiUrl'

import { HOME } from '@shared/router/names'
import { log } from '@shared/utils/logger'
import { FormSubmitTypes } from '@shared/types/form'
import { useFormSubmitNotification } from './useFormSubmitNotification'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY

export const useFormSubmit = () => {
  const forms = useActiveForm()
  const notification = useFormSubmitNotification()
  const validationStore = useValidationStore()
  const router = useRouter()
  const { encrypt } = useEncryption()

  const { canContinueAfterValidation } = storeToRefs(validationStore)

  const getRequest = (type: FormSubmitType) => {
    const { draftId } = forms
    const formData = forms.getFormData()

    switch (type) {
      case FormSubmitTypes.SUBMIT:
      case FormSubmitTypes.DRAFT:
        return {
          method: 'PUT',
          url: useApiFormsSubmitUrl(draftId.value),
          data: formData,
          submit: type === FormSubmitTypes.SUBMIT
        }
      case FormSubmitTypes.VALIDATION:
        return {
          method: 'PATCH',
          data: formData,
          url: useApiFormsValidateUrl(draftId.value)
        }
      default: {
        throw new Error(`FormSubmitType ${type} is unknown`)
      }
    }
  }

  async function onSubmit(
    type: FormSubmitType
  ): Promise<{ data?: any; error?: any; statusCode?: Ref<null | number> }> {
    const { method, url, ...body } = getRequest(type)
    const encryptedBody = await encrypt(publicKey, JSON.stringify(body))
    const options: RequestInit = {
      method,
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: encryptedBody
    }

    forms.setSubmitting(true)

    try {
      const { statusCode, data, error } = await useFetchWithEncryption(url, options).json()
      const validationResult = error?.value?.validationResult ?? data?.value?.validationResult
      forms.setValidationResult({ validationResult })

      if (statusCode.value === 200) {
        return { data, statusCode }
      }

      if (statusCode.value === 422) {
        if (type === FormSubmitTypes.VALIDATION) {
          return { data: error, statusCode }
        }
      }

      throw new Error(error?.value?.message ?? data.value?.message)
    } catch (error) {
      log(error)
      return { error }
    } finally {
      forms.setSubmitting(false)
    }
  }

  function showNotification({ type, error }: { type: FormSubmitType; error?: Error }) {
    if (error) {
      notification.showError({ type, error })
    } else {
      notification.showSuccess(type)
    }
  }

  async function onSubmitForm() {
    const type = FormSubmitTypes.SUBMIT
    const { error } = await onSubmit(type)
    showNotification({ type, error })
    if (error) return
    router.replace({ name: HOME })
    forms.clearForm()
  }

  async function onSubmitDraft() {
    const type = FormSubmitTypes.DRAFT
    const { error } = await onSubmit(type)
    showNotification({ type, error })
  }

  async function onSubmitValidation(id?: string): Promise<void> {
    const type = FormSubmitTypes.VALIDATION

    if (id) {
      forms.setIdIsValidating(id)
    }

    forms.setValidatingIsPending(true)

    await onSubmit(type).finally(() => forms.setValidatingIsPending(false))
  }

  async function onSubmitValidationOrContinue(): Promise<void> {
    const type = FormSubmitTypes.VALIDATION
    const { activeForm } = forms

    forms.setValidatingIsPending(true)

    await onSubmit(type)
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
    onSubmitForm,
    onSubmitDraft,
    onSubmitValidation,
    onSubmitValidationOrContinue
  }
}
