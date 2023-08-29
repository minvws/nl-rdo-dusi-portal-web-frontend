<template>
  <section>
    <div>
      <h1>{{ translate('pages.login.title') }}</h1>
    </div>
    <div>
      <FormView
        v-bind="{
          id: 'login',
          forms: loginForm,
          hideDebug: true,
          buttonLabels: { submit: translate('pages.login.submit') }
        }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

import FormView from '@shared/components/FormView/FormView.vue'
import { useAuthStore } from '@assessment/store/useAuthStore'

const authStore = useAuthStore()

const forgotPassword = computed(() => {
  const text = translate('pages.login.forgot-password')
  return `<a href="/wachtwoord-vergeten">${text}</a>`
})

const loginForm = computed(() => [
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
                  label: 'E-mailadres',
                  options: {
                    placeholder: 'email@email.com'
                  }
                },
                {
                  type: 'CustomControl',
                  scope: '#/properties/password',
                  label: 'Wachtwoord',
                  options: {
                    placeholder: 'wachtwoord'
                  }
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
])

function onSubmit() {
  console.log('@TODO: handle login')
  authStore.logIn()
}
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
