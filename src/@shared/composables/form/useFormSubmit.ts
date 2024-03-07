import type { FormSubmit } from '@shared/types/form'
import { FormSubmitType } from '@shared/types/form'

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

export const useFormSubmit = () => {
  const forms = useActiveForm()
  const notification = useFormSubmitNotification()
  const router = useRouter()
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
        return {
          method: 'PATCH',
          data: formData,
          url: useApiFormsValidateUrl(draftId.value)
        }
      }
      default: {
        throw new Error(`FormSubmit ${type} is unknown`)
      }
    }
  }

  async function onSubmit(
    type: FormSubmit
  ): Promise<{ data?: any; error?: any; statusCode?: any }> {
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
      const { statusCode, data, error } = await useCustomFetch(
        'with-encryption',
        url,
        options
      ).json()
      const validationResult = error?.value?.validationResult ?? data?.value?.validationResult
      forms.setValidationResult({ validationResult })

      if (statusCode.value === 200) {
        return { data, statusCode }
      }

      if (statusCode.value === 422 && type === FormSubmitType.VALIDATION) {
        return { data: error, statusCode }
      }

      throw new Error(error?.value?.message ?? data.value?.message)
    } catch (error) {
      log(error)
      return { error }
    } finally {
      forms.setSubmitting(false)
    }
  }

  function showNotification({ type, error }: { type: FormSubmit; error?: Error }): void {
    error ? notification.showError({ type, error }) : notification.showSuccess(type)
  }

  async function onSubmitForm(): Promise<void> {
    const type = FormSubmitType.SUBMIT
    const { error } = await onSubmit(type)

    showNotification({ type, error })

    if (error) {
      return
    }

    actionStore.getActionsCount()
    forms.clearForm()

    router.replace({ name: HOME })
  }

  async function onSubmitDraft(): Promise<void> {
    const type = FormSubmitType.DRAFT
    const { error } = await onSubmit(type)

    showNotification({ type, error })

    actionStore.getActionsCount()
  }

  async function onSubmitValidation(id?: string): Promise<void> {
    const type = FormSubmitType.VALIDATION

    if (id) {
      forms.setIdIsValidating(id)
    }

    forms.setValidatingIsPending(true)

    await onSubmit(type).finally(() => {
      forms.setValidatingIsPending(false)
    })
  }

  async function onSubmitValidationOrContinue(): Promise<void> {
    const type = FormSubmitType.VALIDATION
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
