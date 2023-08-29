<template>
  <AppHtml
    as="h1"
    :html="translate('component.login.title')"
  />
  <FormView
    v-bind="{
      id: 'login',
      forms,
      hideDebug: true,
      buttonLabels: { submit: translate('component.login.button') }
    }"
    @submit="onSubmit"
  />
</template>

<script setup lang="ts">
import FormView from '@shared/components/FormView/FormView.vue'
import type { FormData } from '@shared/types/form'
import { translate } from '@shared/i18n'
import AppHtml from '@/@shared/components/AppHtml/AppHtml.vue'
import { computed } from 'vue'

const forgotPassword = computed(() => {
  const text = translate('component.login.forgot-password')
  return `<a href="/wachtwoord-vergeten">${text}</a>`
})

const forms = computed(() => {
  return [
    {
      dataschema: {
        properties: {
          email: {
            type: 'string',
            title: 'E-mail',
            format: 'email'
          },
          password: {
            type: 'string',
            title: 'Wachtwoord',
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
                    label: 'E-mailadres'
                  },
                  {
                    type: 'CustomControl',
                    scope: '#/properties/password',
                    label: 'Wachtwoord'
                  },
                  {
                    type: 'FormHtml',
                    options: {
                      html: forgotPassword.value
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
})
const onSubmit = (data: FormData) => {
  console.log(data)
}
</script>
