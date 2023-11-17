import type { Ref } from 'vue'
import type { NotificationDisplayType } from '@shared/types/notification'

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { translate } from '@shared/i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useAuthStore } from '@assessment/store/useAuthStore'
import { NotificationType } from '@shared/types/notification'

import { emailPlaceholder as placeholder } from '@shared/fixtures/form/data/placeholder'

import { LOGIN_VIEW } from '@assessment/router/names'

export const useForgotPassword = () => {
  const NOTIFICATION_ID = 'forget-password'

  const router = useRouter()
  const notificationsStore = useNotificationsStore()

  const locked: Ref<boolean> = ref(false)

  const { forgotPassword } = useAuthStore()

  const forms = computed(() => [
    {
      dataschema: {
        properties: {
          email: {
            type: 'string',
            title: translate('component.passwordLogin.email.title'),
            format: 'email'
          }
        },
        required: ['email']
      },
      uischema: {
        type: 'FormGroupControl',
        options: { section: true },
        elements: [
          {
            type: 'Group',
            elements: [
              {
                type: 'VerticalLayout',
                elements: [
                  {
                    type: 'CustomControl',
                    scope: '#/properties/email',
                    label: translate('component.passwordLogin.email.label'),
                    options: {
                      placeholder
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ])

  async function onSubmit(submitData: Record<'email', string>) {
    const { email } = submitData
    const { error } = await forgotPassword({ email })
    const message = error.value?.message

    locked.value = true

    if (message) {
      locked.value = false
      showNotification(NotificationType.ERROR, message)
      return
    }

    showNotification(NotificationType.CONFIRMATION)
    router.replace({ name: LOGIN_VIEW })
  }

  const showNotification = (type: NotificationDisplayType, error?: string) => {
    const props = error ? { error } : undefined
    const id = type === NotificationType.CONFIRMATION ? 'success' : 'failed'
    const pageChangeCount = type === NotificationType.CONFIRMATION ? 2 : 1

    notificationsStore.add({
      id: NOTIFICATION_ID,
      displayAs: type,
      label: translate(`authentication.forgot-password-${id}.label`, props) ?? '',
      message: translate(`authentication.forgot-password-${id}.message`, props) ?? '',
      pageChangeCount
    })
  }

  return {
    forms,
    onSubmit,
    locked
  }
}
