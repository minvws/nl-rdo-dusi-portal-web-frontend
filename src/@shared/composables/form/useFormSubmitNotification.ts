import type { FormSubmit, FormSubmitError } from '@shared/types/form'
import { FormSubmitType } from '@shared/types/form'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { t } from '@shared/i18n'

const NOTIFICATION_SUBMIT_ID = 'form-submit'
const NOTIFICATION_SAVE_ID = 'form-save'

export const useFormSubmitNotification = () => {
  const notificationsStore = useNotificationsStore()

  function setSubmitError(error: FormSubmitError) {
    if (error.isValidationError) {
      notificationsStore.add({
        message: t('form.message.failed-validation') ?? '',
        displayAs: 'error',
        id: NOTIFICATION_SUBMIT_ID,
        pageChangeCount: 1
      })
      return
    }

    notificationsStore.add({
      message: t('form.message.failed', { error: error.error?.message ?? '' }) ?? '',
      displayAs: 'error',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 1
    })
  }

  function setSubmitSuccess() {
    notificationsStore.add({
      message: t('form.message.success') ?? '',
      displayAs: 'confirmation',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 2,
      dismissable: true
    })
  }

  function setSaveError(error: FormSubmitError) {
    if (error.isValidationError) {
      notificationsStore.add({
        message: t('form.message.save-failed-validation') ?? '',
        displayAs: 'error',
        id: NOTIFICATION_SAVE_ID
      })
      return
    }

    notificationsStore.add({
      message: t('form.message.save-failed', { error: error.error?.message ?? '' }) ?? '',
      displayAs: 'error',
      id: NOTIFICATION_SAVE_ID
    })
  }

  function setSaveSuccess() {
    notificationsStore.add({
      message: t('form.message.save-success') ?? '',
      displayAs: 'confirmation',
      id: NOTIFICATION_SAVE_ID,
      dismissable: true
    })
  }

  function showError({
    type,
    error,
  }: {
    type: FormSubmit
    error: FormSubmitError
  }) {
    type === FormSubmitType.SUBMIT
      ? setSubmitError(error)
      : setSaveError(error)
  }

  function showSuccess(type: FormSubmit) {
    if (type === FormSubmitType.SUBMIT) {
      notificationsStore.removeById(NOTIFICATION_SAVE_ID)
      setSubmitSuccess()
    } else {
      notificationsStore.removeById(NOTIFICATION_SUBMIT_ID)
      setSaveSuccess()
    }
  }

  return {
    showError,
    showSuccess
  }
}
