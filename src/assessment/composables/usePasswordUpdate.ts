import { passWordPlaceholder as placeholder } from '@/@shared/fixtures/form/data/placeholder'

import { translate } from '@/@shared/i18n'

import { computed } from 'vue'

import { useAuthStore } from '@assessment/store/useAuthStore'

export const usePasswordUpdate = () => {
  const { updatePassword, isPasswordExpired } = useAuthStore()

  const required = computed(() => {
    return [!isPasswordExpired && 'currentPassword', 'password', 'passwordConfirmation'].filter(
      required => !!required
    ) as string[]
  })

  const elements = computed(() => {
    const elements = [
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
    if (!isPasswordExpired)
      elements.unshift({
        type: 'CustomControl',
        scope: '#/properties/currentPassword',
        label: translate('component.passwordUpdate.currentPassword'),
        options: {
          placeholder
        }
      })
    return elements
  })

  const forms = computed(() => [
    {
      dataschema: {
        properties: {
          currentPassword: {
            type: 'string',
            title: translate('component.passwordUpdate.currentPassword'),
            format: 'password'
          },
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
        required: required.value
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
                elements: elements.value
              }
            ]
          }
        ]
      }
    }
  ])

  function onSubmit(data: Record<string, string>) {
    const { currentPassword, password, passwordConfirmation } = data
    updatePassword({ currentPassword, password, passwordConfirmation })
  }

  return {
    forms,
    onSubmit
  }
}
