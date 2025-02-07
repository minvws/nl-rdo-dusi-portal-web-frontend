<template>
  <section>
    <AppIntro
      :title="t('pages.forgot-password.title')"
      :body="t('pages.forgot-password.body')"
    />
    <div>
      <FormView
        id="forgot-password"
        :locked="locked"
        :forms="forms"
        hide-debug
        :button-labels="{ submit: t('pages.update-password.submit') }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useForgotPassword } from '@assessment/composables/useForgotPassword'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import FormView from '@shared/components/FormView/FormView.vue'

const { t } = useI18n()
const { forms, onSubmit, locked } = useForgotPassword()

useSEO({ title: `${t('pages.forgot-password.title')} | ${t('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
