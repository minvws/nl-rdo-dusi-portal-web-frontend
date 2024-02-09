<template>
  <section>
    <div>
      <h1>{{ t('pages.two-factor.title') }}</h1>
    </div>
    <div>
      <FormView
        id="two-factor"
        :forms="twoFactorForm"
        hide-debug
        :button-labels="{ submit: t('component.twoFactor.submit') }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import { useSEO } from '@shared/composables/useSeo'
import { useAuthStore } from '@assessment/store/useAuthStore'

import FormView from '@shared/components/FormView/FormView.vue'

import { LOGIN_VIEW, HOME } from '@assessment/router/names'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const { isLoggedIn, needsTwoFactor } = storeToRefs(authStore)

useSEO({ title: `${t('pages.two-factor.title')} | ${t('app.prefix')}` })

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
                  label: t('component.twoFactor.label'),
                  options: {
                    autofocus: true,
                    placeholder: t('component.twoFactor.placeholder'),
                    tip: t('component.twoFactor.tip')
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
