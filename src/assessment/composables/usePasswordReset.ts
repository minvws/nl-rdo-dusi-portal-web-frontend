import type { LocationQuery } from 'vue-router'
import type { NotificationDisplayType } from '@shared/types/notification'

import { translate } from '@shared/i18n'
import { useFetch } from '@vueuse/core'

import { watch } from 'vue'
import { useApiPasswordResetUrl } from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useRouter } from 'vue-router'

import { NotificationType } from '@shared/types/notification'

import { LOGIN_VIEW } from '@assessment/router/names'

const NOTIFICATION_ID = 'password-reset'

export const usePasswordReset = ({ email, token }: LocationQuery) => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const url = useApiPasswordResetUrl()

  const { error, ...fetch } = useFetch(url).post({ email, token })

  const showNotification = (type: NotificationDisplayType, error?: string) => {
    const props = error ? { error } : undefined
    const id = type === NotificationType.CONFIRMATION ? 'success' : 'failed'

    notificationsStore.add({
      id: NOTIFICATION_ID,
      displayAs: type,
      label: translate(`authentication.password-reset-${id}.label`, props) ?? '',
      message: translate(`authentication.password-reset-${id}.message`, props) ?? '',
      pageChangeCount: 2
    })
  }

  watch(error, error => {
    error
      ? showNotification(NotificationType.ERROR, error)
      : showNotification(NotificationType.CONFIRMATION)
    router.replace({ name: LOGIN_VIEW })
  })

  return {
    ...fetch
  }
}
