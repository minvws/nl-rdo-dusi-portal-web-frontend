<template>
  <section>
    <div>
      <h1>{{ translate('pages.two-factor.title') }}</h1>
    </div>
    <div>
      <FormView
        v-bind="{
          id: 'two-factor',
          forms: twoFactorForm,
          hideDebug: true,
          buttonLabels: { submit: translate('component.twoFactor.submit') }
        }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useAuthStore } from '@assessment/store/useAuthStore'

import FormView from '@shared/components/FormView/FormView.vue'

import { LOGIN_VIEW, HOME } from '@assessment/router/names'

useSEO({ title: `${translate('pages.two-factor.title')} | ${translate('app.prefix')}` })

const authStore = useAuthStore()
const router = useRouter()

const { isLoggedIn, needsTwoFactor } = storeToRefs(authStore)

const twoFactorForm = [
  {
    dataschema: {
      properties: {
        code: {
          type: 'string',
          title: 'Code'
        }
      },
      required: ['code']
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
                  scope: '#/properties/code',
                  label: translate('component.twoFactor.label'),
                  options: {
                    autofocus: true,
                    placeholder: translate('component.twoFactor.placeholder'),
                    tip: translate('component.twoFactor.tip')
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

function onSubmit(data: Record<string, string>) {
  const { code } = data
  authStore.twoFactorChallenge(code)
}

onBeforeMount(() => {
  if (isLoggedIn.value) {
    router.push({ name: HOME })
  }

  if (!needsTwoFactor.value) {
    router.push({ name: LOGIN_VIEW })
  }
})
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
