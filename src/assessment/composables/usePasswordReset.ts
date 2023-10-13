import type { LocationQuery } from 'vue-router'
import type { NotificationDisplayType } from '@shared/types/notification'

import { translate } from '@shared/i18n'
import { useFetch } from '@vueuse/core'

import { computed, ref, watch } from 'vue'
import { useApiPasswordResetUrl } from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useRouter } from 'vue-router'

import { NotificationType } from '@shared/types/notification'

import { JSONRequestHeaders } from '@/@shared/composables/useFetchHeaders'
import { formatPayloadFromCamelCaseToSnakeCase } from '@shared/utils/format'
import { passWordPlaceholder as placeholder } from '@shared/fixtures/form/data/placeholder'

import { LOGIN_VIEW } from '@assessment/router/names'

const NOTIFICATION_ID = 'password-reset'

export const usePasswordReset = ({ email, token }: LocationQuery) => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const url = useApiPasswordResetUrl()
  const payload = ref({ email, token })

  const { error, execute, ...fetch } = useFetch(url, JSONRequestHeaders, {
    immediate: false,
    onFetchError: ctx => {
      if (ctx.data && ctx.data.message) {
        ctx.error = new Error(ctx.data.message)
      }
      return ctx
    }
  })
    .post(payload)
    .json()

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

  watch(
    () => [error.value, fetch.isFetching.value],
    ([error, isFetching]) => {
      if (isFetching) {
        notificationsStore.removeById(NOTIFICATION_ID)
        return
      }
      if (error) {
        showNotification(NotificationType.ERROR, error)
        return
      }
      showNotification(NotificationType.CONFIRMATION)
      router.replace({ name: LOGIN_VIEW })
    }
  )

  function onSubmit(data: Record<string, string>) {
    Object.assign(payload.value, formatPayloadFromCamelCaseToSnakeCase(data))
    execute()
  }

  return {
    ...fetch,
    forms,
    onSubmit
  }
}
