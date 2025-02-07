import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import { passWordPlaceholder as placeholder } from '@shared/fixtures/form/data/placeholder'

import { computed } from 'vue'

import { t } from '@shared/i18n'

import { useAuthStore } from '@assessment/store/useAuthStore'

export const usePasswordUpdate = () => {
  const { updatePassword, isPasswordExpired } = useAuthStore()

  const required = computed<string[]>(
    () =>
      [!isPasswordExpired && 'currentPassword', 'password', 'passwordConfirmation'].filter(
        (required) => !!required
      ) as string[]
  )

  const elements = computed<
    {
      type: string
      scope: string
      label: string | undefined
      options: {
        placeholder: string
      }
    }[]
  >(() => {
    const elements = [
      {
        type: 'CustomControl',
        scope: '#/properties/password',
        label: t('component.passwordUpdate.newPassword'),
        options: {
          placeholder
        }
      },
      {
        type: 'CustomControl',
        scope: '#/properties/passwordConfirmation',
        label: t('component.passwordUpdate.passwordConfirmation'),
        options: {
          placeholder
        }
      }
    ]

    if (!isPasswordExpired) {
      elements.unshift({
        type: 'CustomControl',
        scope: '#/properties/currentPassword',
        label: t('component.passwordUpdate.currentPassword'),
        options: {
          placeholder
        }
      })
    }

    return elements
  })

  const forms = computed<{ dataschema: JsonSchema; uischema: UISchemaElement }[]>(() => [
    {
      dataschema: {
        properties: {
          currentPassword: {
            type: 'string',
            title: t('component.passwordUpdate.currentPassword'),
            format: 'password'
          },
          password: {
            type: 'string',
            title: t('component.passwordUpdate.newPassword'),
            updatePassword: true,
            format: 'password'
          },
          passwordConfirmation: {
            type: 'string',
            title: t('component.passwordUpdate.passwordConfirmation'),
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
