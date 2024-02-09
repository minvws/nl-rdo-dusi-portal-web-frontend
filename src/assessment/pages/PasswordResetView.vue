<template>
  <section>
    <div>
      <h1>{{ t('pages.update-password.title') }}</h1>
    </div>
    <div>
      <p>
        {{ t('pages.update-password.intro') }}
      </p>
      <p>
        {{ t('pages.update-password.requirements') }}
      </p>
    </div>
    <div>
      <FormView
        id="password-reset"
        :forms="forms"
        hide-debug
        :locked="locked"
        :button-labels="{ submit: t('pages.update-password.submit') }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { usePasswordReset } from '@assessment/composables/usePasswordReset'

import FormView from '@shared/components/FormView/FormView.vue'

const { t } = useI18n()
const route = useRoute()
const { forms, onSubmit, locked } = usePasswordReset(route.query)

useSEO({ title: `${t('pages.password-reset.title')} | ${t('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
