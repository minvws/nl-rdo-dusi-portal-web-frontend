<template>
  <section>
    <div>
      <h1>{{ t('pages.login.title') }}</h1>
    </div>
    <div>
      <FormView
        id="login"
        :forms="forms"
        hide-debug
        :button-labels="{ submit: t('pages.login.submit') }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { usePasswordLogin } from '@assessment/composables/usePasswordLogin'

import FormView from '@shared/components/FormView/FormView.vue'

const { t } = useI18n()
const { forms, onSubmit } = usePasswordLogin()

useSEO({ title: `${t('pages.login.title')} | ${t('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
