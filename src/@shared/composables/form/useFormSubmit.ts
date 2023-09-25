import type { FormSubmitType } from '@shared/types/form'

import { useRouter } from 'vue-router'

import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useEncryption } from '@shared/composables/useEncryption'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiFormsSubmitUrl } from '@shared/composables/useApiUrl'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { HOME } from '@shared/router/names'
import { log } from '@shared/utils/logger'
import { translate } from '@shared/i18n'
import { FormSubmitTypes } from '@shared/types/form'

const publicKey = window?.config?.formEncryptionPublicKey || import.meta.env.VITE_FORM_PUBLIC_KEY

export const useFormSubmit = () => {
  const forms = useActiveForm()
  const notification = useNotificationsStore()
  const router = useRouter()
  const { encrypt } = useEncryption()

  const NOTIFICATION_SUBMIT_ID = 'form-submit'
  const NOTIFICATION_SAVE_ID = 'form-save'

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
      const response = await useFetchWithCredentials(url, options).json()
      if (response.statusCode.value === 200) return undefined
      throw new Error(response.data.value.message)
    } catch (error) {
      log(error)
      return error
    } finally {
      forms.setSubmitting(false)
    }
  }

  async function onSubmitForm() {
    const error = await onSubmit(FormSubmitTypes.SUBMIT)
    if (error) {
      notification.add({
        message: translate('form.message.failed') || '',
        displayAs: 'error',
        id: NOTIFICATION_SUBMIT_ID,
        pageChangeCount: 1
      })
    } else {
      notification.add({
        message: translate('form.message.success') || '',
        displayAs: 'confirmation',
        id: NOTIFICATION_SUBMIT_ID,
        pageChangeCount: 2
      })
      return router.replace({ name: HOME })
    }
  }

  async function onSubmitDraft() {
    const error = await onSubmit(FormSubmitTypes.DRAFT)
    if (error) {
      notification.add({
        message: translate('form.message.save-failed') || '',
        displayAs: 'error',
        id: NOTIFICATION_SAVE_ID,
        duration: 3000
      })
    } else {
      notification.add({
        message: translate('form.message.save-success') || '',
        displayAs: 'confirmation',
        id: NOTIFICATION_SAVE_ID,
        duration: 3000
      })
    }
  }

  return {
    onSubmitForm,
    onSubmitDraft
  }
}
