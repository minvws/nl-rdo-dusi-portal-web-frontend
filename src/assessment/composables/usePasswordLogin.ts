import { passWordPlaceholder as placeholder } from '@/@shared/fixtures/form/data/placeholder'

import { translate } from '@/@shared/i18n'

import { computed } from 'vue'

import { useAuthStore } from '@assessment/store/useAuthStore'

export const usePasswordLogin = () => {
  const authStore = useAuthStore()

  const forms = computed(() => [
    {
      dataschema: {
        properties: {
          email: {
            type: 'string',
            title: translate('component.passwordLogin.email.title'),
            format: 'email'
          },
          password: {
            type: 'string',
            title: translate('component.passwordLogin.password'),
            format: 'password'
          }
        },
        required: ['email', 'password']
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
                      placeholder: 'email@example.com'
                    }
                  },
                  {
                    type: 'CustomControl',
                    scope: '#/properties/password',
                    label: translate('component.passwordLogin.password'),
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

  function onSubmit(data: Record<string, string>) {
    const { email, password } = data
    authStore.logIn({ email, password })
  }

  return {
    forms,
    onSubmit
  }
}
