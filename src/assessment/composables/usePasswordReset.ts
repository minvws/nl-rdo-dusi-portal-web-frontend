import { translate } from '@/@shared/i18n'
import { useFetch } from '@vueuse/core'

import { watch } from 'vue'
import { useApiPasswordResetUrl } from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useRouter, type LocationQuery } from 'vue-router'

import { LOGIN_VIEW } from '@assessment/router/names'

export const usePasswordReset = ({ email, token }: LocationQuery) => {
  const NOTIFICATION_ID = 'password-reset'

  const router = useRouter()
  const notifications = useNotificationsStore()

  const { error, ...fetch } = useFetch(useApiPasswordResetUrl()).post({ email, token })

  const showNotification = (type: 'success' | 'failed', error?: string) => {
    const props = error ? { error } : undefined

    notifications.add({
      id: NOTIFICATION_ID,
      displayAs: 'error',
      label: translate(`authentication.password-reset-${type}.label`, props) ?? '',
      message: translate(`authentication.password-reset-${type}.message`, props) ?? ''
    })
  }

  watch(error, error => {
    if (error) showNotification('failed', error)
    else showNotification('success')
    router.replace({ name: LOGIN_VIEW })
  })

  return {
    ...fetch
  }
}
