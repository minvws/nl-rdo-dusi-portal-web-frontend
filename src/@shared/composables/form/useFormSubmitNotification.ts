import type { FormSubmitType } from '@shared/types/form'
import { FormSubmitTypes } from '@shared/types/form'

import { translate } from '@shared/i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

export const useFormSubmitNotification = () => {
  const notification = useNotificationsStore()
  const NOTIFICATION_SUBMIT_ID = 'form-submit'
  const NOTIFICATION_SAVE_ID = 'form-save'

  function setSubmitError(error?: Error) {
    notification.add({
      message: translate('form.message.failed', { error: error?.message ?? '' }) || '',
      displayAs: 'error',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 1
    })
  }

  function setSubmitSuccess() {
    notification.add({
      message: translate('form.message.success') || '',
      displayAs: 'confirmation',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 2
    })
  }

  function setSaveError(error?: Error) {
    notification.add({
      message: translate('form.message.save-failed', { error: error?.message ?? '' }) || '',
      displayAs: 'error',
      id: NOTIFICATION_SAVE_ID
    })
  }

  function setSaveSuccess() {
    notification.add({
      message: translate('form.message.save-success') || '',
      displayAs: 'confirmation',
      id: NOTIFICATION_SAVE_ID
    })
  }

  function showError({ type, error }: { type: FormSubmitType; error?: Error }) {
    type === FormSubmitTypes.SUBMIT ? setSubmitError(error) : setSaveError(error)
  }

  function showSuccess(type: FormSubmitType) {
    type === FormSubmitTypes.SUBMIT ? setSubmitSuccess() : setSaveSuccess()
  }

  return {
    showError,
    showSuccess
  }
}
