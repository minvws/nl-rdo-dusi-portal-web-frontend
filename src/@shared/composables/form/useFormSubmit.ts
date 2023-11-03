import type { FormSubmitType } from '@shared/types/form'

import { useRouter } from 'vue-router'

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

  const router = useRouter()
  const { encrypt } = useEncryption()

  const getRequest = (type: FormSubmitType) => {
    const { draftId, formData } = forms
    switch (type) {
      case FormSubmitTypes.SUBMIT:
      case FormSubmitTypes.DRAFT:
        return {
          method: 'PUT',
          url: useApiFormsSubmitUrl(draftId.value),
          data: formData.value,
          params: { submit: type === FormSubmitTypes.SUBMIT }
        }
      case FormSubmitTypes.VALIDATION:
        return {
          method: 'PATCH',
          data: formData.value,
          url: useApiFormsValidateUrl(draftId.value)
        }
    }
    throw new Error(`FormSubmitType ${type} is unknown`)
  }

  async function onSubmit(type: FormSubmitType) {
    const { method, url, ...body } = getRequest(type)
    const encryptedBody = await encrypt(publicKey, JSON.stringify(body))
    const options: RequestInit = {
      method,
      credentials: 'include',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: encryptedBody
    }
    forms.setSubmitting(true)
    try {
      const { statusCode, data, error } = await useFetchWithEncryption(url, options).json()
      if (statusCode.value === 200) return { data: data.value }
      if (type === FormSubmitTypes.VALIDATION && statusCode.value === 422)
        return { data: error.value }
      throw new Error(error?.value?.message ?? data.value?.message)
    } catch (error) {
      log(error)
      return { error: error as Error }
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

  async function onSubmitValidation() {
    forms.setValidatingIsPending(true)
    const type = FormSubmitTypes.VALIDATION
    const { data } = await onSubmit(type)
    forms.setValidationResult(data ?? [])
    forms.setValidatingIsPending(false)
  }

  return {
    onSubmitForm,
    onSubmitDraft,
    onSubmitValidation
  }
}
