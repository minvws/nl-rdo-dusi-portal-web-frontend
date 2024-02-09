import type { Ref } from 'vue'
import type { NotificationDisplayType } from '@shared/types/notification'

import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { NotificationType } from '@shared/types/notification'

import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { HOME } from '@shared/router/names'
import { log } from '@shared/utils/logger'

export const useFormDraft = (formId: Ref<string>) => {
  const { t } = useI18n()
  const { setDraft, setDraftIsPending, draftIsPending, draftId } = useActiveForm()
  const router = useRouter()
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

  async function createFormDraft() {
    if (draftIsPending.value || draftId.value) {
      // do not create a draft when draft is pending or a draftId is set
      return
    }
    const id = formId.value
    const url = useApiDraftFormUrl(id)
    const options: RequestInit = {
      method: 'POST'
    }

    setDraftIsPending(true)

    const {
      data: { value: data },
      error: { value: error }
    } = await useCustomFetch('with-encryption', url, options).json()

    if (error?.code) {
      notificationsStore.add({
        message:
          t(`form.message.${error.code}`) ||
          t('form.message.loadingError', { error: error.message }) ||
          '',
        displayAs: getDisplayType(error.code),
        id: 'form-draft-error',
        pageChangeCount: 2
      })
      log('error creating draft', error)
      router.replace({ name: HOME })
      return
    }
    setDraft(data)
  }

  return {
    createFormDraft
  }
}
