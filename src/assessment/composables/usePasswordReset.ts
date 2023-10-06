import { emailPlaceholder as placeholder } from '@/@shared/fixtures/form/data/placeholder'

import { translate } from '@/@shared/i18n'

import { computed } from 'vue'

export const usePasswordReset = () => {
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
    console.log(`TODO: password reset for  ${email}`)
  }

  return {
    forms,
    onSubmit
  }
}
