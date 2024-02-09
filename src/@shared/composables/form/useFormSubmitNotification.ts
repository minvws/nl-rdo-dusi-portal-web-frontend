import type { FormSubmit } from '@shared/types/form'
import { FormSubmitType } from '@shared/types/form'

import { useI18n } from 'vue-i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

const NOTIFICATION_SUBMIT_ID = 'form-submit'
const NOTIFICATION_SAVE_ID = 'form-save'

export const useFormSubmitNotification = () => {
  const { t } = useI18n()
  const notificationsStore = useNotificationsStore()

  function setSubmitError(error?: Error) {
    notificationsStore.add({
      message: t('form.message.failed', { error: error?.message ?? '' }) ?? '',
      displayAs: 'error',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 1
    })
  }

  function setSubmitSuccess() {
    notificationsStore.add({
      message: t('form.message.success'),
      displayAs: 'confirmation',
      id: NOTIFICATION_SUBMIT_ID,
      pageChangeCount: 2
    })
  }

  function setSaveError(error?: Error) {
    notificationsStore.add({
      message: t('form.message.save-failed', { error: error?.message ?? '' }) ?? '',
      displayAs: 'error',
      id: NOTIFICATION_SAVE_ID
    })
  }

  function setSaveSuccess() {
    notificationsStore.add({
      message: t('form.message.save-success') ?? '',
      displayAs: 'confirmation',
      id: NOTIFICATION_SAVE_ID
    })
  }

  function showError({ type, error }: { type: FormSubmit; error?: Error }) {
    type === FormSubmitType.SUBMIT ? setSubmitError(error) : setSaveError(error)
  }

  function showSuccess(type: FormSubmit) {
    type === FormSubmitType.SUBMIT ? setSubmitSuccess() : setSaveSuccess()
  }

  return {
    showError,
    showSuccess
  }
}
