import type { Ref } from 'vue'
import type { NotificationDisplayType } from '@shared/types/notification'

import { NotificationType } from '@shared/types/notification'

import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { translate } from '@shared/i18n'
import { useRouter } from 'vue-router'
import { HOME } from '@shared/router/names'
import { log } from '@shared/utils/logger'

export const useFormDraft = (formId: Ref<string>) => {
  const { setDraftId } = useActiveForm()
  const router = useRouter()
  const notification = useNotificationsStore()

  function getDisplayType(code: string): NotificationDisplayType {
    switch (code) {
      case 'application_already_exists':
        return NotificationType.EXPLANATION
    }
    return NotificationType.ERROR
  }

  async function createFormDraft() {
    const id = formId.value
    const url = useApiDraftFormUrl(id)

    const options: RequestInit = {
      method: 'POST'
    }

    const {
      data: { value: data },
      error: { value: error }
    } = await useFetchWithCredentials(url, options).json()

    if (error?.code) {
      notification.add({
        message:
          translate(`form.message.${error.code}`) ||
          translate('form.message.loadingError', { error: error.message }) ||
          '',
        displayAs: getDisplayType(error.code),
        id: 'form-draft-error',
        pageChangeCount: 2
      })
      log('error creating draft', error)
      router.replace({ name: HOME })
      return
    }
    setDraftId(data.reference)
  }

  return {
    createFormDraft
  }
}
