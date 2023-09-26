import type { FormSubmitType } from '@shared/types/form'
import { FormSubmitTypes } from '@shared/types/form'

import { translate } from '@shared/i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

export const useFormSubmitNotification = () => {
  const notification = useNotificationsStore()
  const NOTIFICATION_SUBMIT_ID = 'form-submit'
  const NOTIFICATION_SAVE_ID = 'form-save'

  const setSubmitError = (error?: Error) => {
    notification.add({
      message: translate('form.message.failed', { error: error?.message ?? '' }) || '',
      displayAs: 'error',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 1
    })
  }

  const setSubmitSuccess = () => {
    notification.add({
      message: translate('form.message.success') || '',
      displayAs: 'confirmation',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 2
    })
  }

  const setSaveError = (error?: Error) => {
    notification.add({
      message: translate('form.message.save-failed', { error: error?.message ?? '' }) || '',
      displayAs: 'error',
      id: NOTIFICATION_SAVE_ID,
      duration: 3000
    })
  }

  const setSaveSuccess = () => {
    notification.add({
      message: translate('form.message.save-success') || '',
      displayAs: 'confirmation',
      id: NOTIFICATION_SAVE_ID,
      duration: 3000
    })
  }

  const showError = ({ type, error }: { type: FormSubmitType; error?: Error }) => {
    if (type === FormSubmitTypes.SUBMIT) return setSubmitError(error)
    return setSaveError(error)
  }

  const showSuccess = (type: FormSubmitType) => {
    if (type === FormSubmitTypes.SUBMIT) return setSubmitSuccess()
    return setSaveSuccess()
  }

  return {
    showError,
    showSuccess
  }
}
