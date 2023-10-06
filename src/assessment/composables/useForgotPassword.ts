import { emailPlaceholder as placeholder } from '@/@shared/fixtures/form/data/placeholder'

import { translate } from '@/@shared/i18n'
import { useFetch } from '@vueuse/core'

import { ref, computed, watch, type Ref } from 'vue'
import { useApiForgotPasswordUrl } from './useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

export const useForgotPassword = () => {
  const NOTIFICATION_ID = 'forget-password'

  const notifications = useNotificationsStore()

  const payload: Ref<{ email: string | undefined }> = ref({ email: undefined })

  const { execute, error, ...fetch } = useFetch(useApiForgotPasswordUrl(), {
    immediate: false
  }).post(payload)

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

  const showNotificationError = (error?: string) => {
    const props = error ? { error } : undefined

    notifications.add({
      id: NOTIFICATION_ID,
      displayAs: 'error',
      label: translate('authentication.forgot-password-failed.label', props) ?? '',
      message: translate('authentication.forgot-password-failed.message', props) ?? '',
      pageChangeCount: 1
    })
  }

  const removeNotificationError = () => {
    notifications.removeById(NOTIFICATION_ID)
  }

  watch(error, error => {
    if (error) showNotificationError(error)
    else removeNotificationError()
  })

  return {
    forms,
    onSubmit,
    ...fetch
  }
}
