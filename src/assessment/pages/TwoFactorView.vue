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
          buttonLabels: { submit: translate('pages.two-factor.submit') }
        }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'
import { useAuthStore } from '@assessment/store/useAuthStore'

import FormView from '@shared/components/FormView/FormView.vue'

import { LOGIN_VIEW } from '@shared/router/names'

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.two-factor.title')}` })

const authStore = useAuthStore()
const router = useRouter()

const { hasTwoFactor, isLoggedIn } = storeToRefs(authStore)

const twoFactorForm = [
  {
    dataschema: {
      properties: {
        code: {
          type: 'string',
          title: 'Code',
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
                  label: 'Code',
                  options: {
                    placeholder: '123456',
                    tip: "Voer de zescijferige code in die u via SMS of een authenticator-app heeft ontvangen."
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
  if (!hasTwoFactor.value && !isLoggedIn.value) {
    router.push({ name: LOGIN_VIEW })
  }
})
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
