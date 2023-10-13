import type { Ref } from 'vue'
import type { NotificationDisplayType } from '@shared/types/notification'

import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { translate } from '@shared/i18n'
import { useFetch } from '@vueuse/core'

import { useApiForgotPasswordUrl } from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { NotificationType } from '@shared/types/notification'

import { emailPlaceholder as placeholder } from '@shared/fixtures/form/data/placeholder'

import { LOGIN_VIEW } from '@assessment/router/names'

export const useForgotPassword = () => {
  const NOTIFICATION_ID = 'forget-password'

  const router = useRouter()
  const notificationsStore = useNotificationsStore()

  const payload: Ref<{ email: string | undefined }> = ref({ email: undefined })

  const options: RequestInit = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const { execute, isFinished, error, ...fetch } = useFetch(useApiForgotPasswordUrl(), options, {
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

  function onSubmit(data: Record<'email', string>) {
    const { email } = data
    payload.value.email = email
    execute()
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

  watch(isFinished, isFinished => {
    if (!isFinished) return
    if (error.value) {
      showNotification(NotificationType.ERROR, error.value.message)
      return
    }
    showNotification(NotificationType.CONFIRMATION)
    router.replace({ name: LOGIN_VIEW })
  })

  return {
    forms,
    onSubmit,
    ...fetch
  }
}
