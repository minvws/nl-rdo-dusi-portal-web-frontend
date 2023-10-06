import { translate } from '@/@shared/i18n'
import { useFetch } from '@vueuse/core'

import { watch } from 'vue'
import { useApiPasswordResetUrl } from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useRouter, type LocationQuery } from 'vue-router'

import { NotificationType, type NotificationDisplayType } from '@/@shared/types/notification'


import { LOGIN_VIEW } from '@assessment/router/names'

export const usePasswordReset = ({ email, token }: LocationQuery) => {
  const NOTIFICATION_ID = 'password-reset'

  const router = useRouter()
  const notifications = useNotificationsStore()

  const { error, ...fetch } = useFetch(useApiPasswordResetUrl()).post({ email, token })

  const showNotification = (type: NotificationDisplayType, error?: string) => {
    const props = error ? { error } : undefined
    const id = type === NotificationType.CONFIRMATION ? 'success' : 'failed'

    notifications.add({
      id: NOTIFICATION_ID,
      displayAs: type,
      label: translate(`authentication.password-reset-${id}.label`, props) ?? '',
      message: translate(`authentication.password-reset-${id}.message`, props) ?? '',
      pageChangeCount: 2
    })
  }

  watch(error, error => {
    if (error) showNotification(NotificationType.ERROR, error)
    else showNotification(NotificationType.CONFIRMATION)
    router.replace({ name: LOGIN_VIEW })
  })

  return {
    ...fetch
  }
}
