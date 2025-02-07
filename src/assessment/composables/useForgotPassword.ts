import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import type { NotificationDisplayType } from '@shared/types/notification'

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { t } from '@shared/i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useAuthStore } from '@assessment/store/useAuthStore'
import { NotificationType } from '@shared/types/notification'

import { emailPlaceholder as placeholder } from '@shared/fixtures/form/data/placeholder'

import { LOGIN_VIEW } from '@assessment/router/names'

const NOTIFICATION_ID = 'forget-password'

export const useForgotPassword = () => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const { forgotPassword } = useAuthStore()

  const locked = ref<boolean>(false)

  const forms = computed<{ dataschema: JsonSchema; uischema: UISchemaElement }[]>(() => [
    {
      dataschema: {
        properties: {
          email: {
            type: 'string',
            title: t('component.passwordLogin.email.title'),
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
                    label: t('component.passwordLogin.email.label'),
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
    const { data, error } = await forgotPassword({ email })
    const message = data.value.message ?? ''

    locked.value = true

    if (error.value) {
      locked.value = false
      showNotification(NotificationType.ERROR, message)
      return
    }

    showNotification(NotificationType.CONFIRMATION, message)
    router.replace({ name: LOGIN_VIEW })
  }

  function showNotification(type: NotificationDisplayType, message?: string): void {
    const props = message ? { message } : undefined
    const id = type === NotificationType.CONFIRMATION ? 'success' : 'failed'
    const pageChangeCount = type === NotificationType.CONFIRMATION ? 2 : 1

    notificationsStore.add({
      id: NOTIFICATION_ID,
      displayAs: type,
      label: t(`authentication.forgot-password-${id}.label`, props) ?? '',
      message: t(`authentication.forgot-password-${id}.message`, props) ?? '',
      pageChangeCount
    })
  }

  return {
    forms,
    onSubmit,
    locked
  }
}
