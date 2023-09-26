import type { FormSubmitType } from '@shared/types/form'

import { useRouter } from 'vue-router'

import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useEncryption } from '@shared/composables/useEncryption'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiFormsSubmitUrl } from '@shared/composables/useApiUrl'

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

  async function onSubmit(type: FormSubmitType) {
    const { draftId, formData } = forms
    const url = useApiFormsSubmitUrl(draftId.value)
    const body = { data: formData.value, submit: type === FormSubmitTypes.SUBMIT }
    const encryptedBody = await encrypt(publicKey, JSON.stringify(body))

    const options: RequestInit = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: encryptedBody
    }

    forms.setSubmitting(true)

    try {
      const { statusCode, data, error } = await useFetchWithCredentials(url, options).json()
      if (statusCode.value === 200) return undefined
      throw new Error(error?.value?.message ?? data.value?.message)
    } catch (error) {
      log(error)
      return error as Error
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
    const error = await onSubmit(type)
    showNotification({ type, error })
    if (error) return
    return router.replace({ name: HOME })
  }

  async function onSubmitDraft() {
    const type = FormSubmitTypes.DRAFT
    const error = await onSubmit(type)
    showNotification({ type, error })
  }

  return {
    onSubmitForm,
    onSubmitDraft
  }
}
