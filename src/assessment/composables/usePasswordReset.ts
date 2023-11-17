import type { Ref } from 'vue'
import type { LocationQuery } from 'vue-router'
import type { NotificationDisplayType } from '@shared/types/notification'

import { translate } from '@shared/i18n'

import { computed, ref } from 'vue'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useRouter } from 'vue-router'

import { NotificationType } from '@shared/types/notification'

import { formatPayloadFromCamelCaseToSnakeCase } from '@shared/utils/format'
import { passWordPlaceholder as placeholder } from '@shared/fixtures/form/data/placeholder'

import { LOGIN_VIEW } from '@assessment/router/names'
import { useAuthStore } from '@assessment/store/useAuthStore'

export const usePasswordReset = (queryParams: LocationQuery) => {
  const NOTIFICATION_ID = 'password-reset'

  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const { resetPassword } = useAuthStore()

  const locked: Ref<boolean> = ref(false)
  const email: string = queryParams.email ? (queryParams.email as string) : ''
  const token: string = queryParams.token ? (queryParams.token as string) : ''

  const showNotification = (type: NotificationDisplayType, error?: string) => {
    const props = error ? { error } : undefined
    const id = type === NotificationType.CONFIRMATION ? 'success' : 'failed'

    notificationsStore.add({
      id: NOTIFICATION_ID,
      displayAs: type,
      label: translate(`authentication.password-reset-${id}.label`, props) ?? '',
      message: translate(`authentication.password-reset-${id}.message`, props) ?? '',
      pageChangeCount: type === NotificationType.CONFIRMATION ? 2 : 1
    })
  }

  const forms = computed(() => [
    {
      dataschema: {
        properties: {
          password: {
            type: 'string',
            title: translate('component.passwordUpdate.newPassword'),
            updatePassword: true,
            format: 'password'
          },
          passwordConfirmation: {
            type: 'string',
            title: translate('component.passwordUpdate.passwordConfirmation'),
            format: 'password',
            updatePassword: true,
            const: {
              $data: '1/password'
            }
          }
        },
        required: ['password', 'passwordConfirmation']
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
                    scope: '#/properties/password',
                    label: translate('component.passwordUpdate.newPassword'),
                    options: {
                      placeholder
                    }
                  },
                  {
                    type: 'CustomControl',
                    scope: '#/properties/passwordConfirmation',
                    label: translate('component.passwordUpdate.passwordConfirmation'),
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

  async function onSubmit(data: Record<string, string>) {
    locked.value = true
    notificationsStore.removeById(NOTIFICATION_ID)

    const { password, password_confirmation } = formatPayloadFromCamelCaseToSnakeCase(data)

    const { error } = await resetPassword({
      email,
      token,
      password,
      password_confirmation
    })
    if (error.value) {
      locked.value = false
      showNotification(NotificationType.ERROR, error.value)
      return
    }
    showNotification(NotificationType.CONFIRMATION)
    router.replace({ name: LOGIN_VIEW })
  }

  return {
    forms,
    onSubmit,
    locked
  }
}
