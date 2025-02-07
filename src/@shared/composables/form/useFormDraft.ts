import type { NotificationDisplayType } from '@shared/types/notification'

import { NotificationType } from '@shared/types/notification'

import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { log } from '@shared/utils/logger'
import { t } from '@shared/i18n'

export const useFormDraft = () => {
  const notificationsStore = useNotificationsStore()

  function getDisplayType(code: string): NotificationDisplayType {
    switch (code) {
      case 'application_already_exists': {
        return NotificationType.EXPLANATION
      }
      default: {
        return NotificationType.ERROR
      }
    }
  }

  function getErrorNotificationMessage(error: { code: string; message?: string }): string {
    if (error.message) {
      return error.message
    }

    return t(`form.message.${error.code}`) || t('form.message.loading_error', { error: error.code }) || ''
  }

  async function createDraft(subsidyCode: string) {
    const url = useApiDraftFormUrl(subsidyCode)
    const options: RequestInit = {
      method: 'POST'
    }

    const {
      data: { value: data },
      error: { value: error }
    } = await useCustomFetch('with-encryption', url, options).json()

    if (error?.code) {
      notificationsStore.add({
        message: getErrorNotificationMessage(error),
        displayAs: getDisplayType(error.code),
        id: 'form-draft-error',
        pageChangeCount: 2
      })
      log('error creating draft', error)
      return
    }

    return data
  }

  return {
    createDraft
  }
}
