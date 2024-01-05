import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import { passWordPlaceholder, emailPlaceholder } from '@shared/fixtures/form/data/placeholder'

import { computed } from 'vue'

import { translate } from '@shared/i18n'

import { useAuthStore } from '@assessment/store/useAuthStore'

export const usePasswordLogin = () => {
  const { logIn } = useAuthStore()

  const forms = computed<{ dataschema: JsonSchema; uischema: UISchemaElement }[]>(() => [
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
                      placeholder: emailPlaceholder
                    }
                  },
                  {
                    type: 'CustomControl',
                    scope: '#/properties/password',
                    label: translate('component.passwordLogin.password'),
                    options: {
                      placeholder: passWordPlaceholder
                    }
                  },
                  {
                    type: 'FormGroupControl',
                    label: ' ',
                    elements: [
                      {
                        type: 'FormHtml',
                        options: {
                          html: `<a href='/wachtwoord-vergeten'>${translate(
                            'component.passwordLogin.forgotPassword'
                          )}</a>`
                        }
                      }
                    ]
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
    logIn({ email, password })
  }

  return {
    forms,
    onSubmit
  }
}
