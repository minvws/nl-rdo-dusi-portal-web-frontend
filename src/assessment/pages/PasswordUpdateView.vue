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
        id="password-update"
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
import { usePasswordUpdate } from '@assessment/composables/usePasswordUpdate'

import FormView from '@shared/components/FormView/FormView.vue'

const { t } = useI18n()
const { forms, onSubmit } = usePasswordUpdate()

useSEO({ title: `${t('pages.update-password.title')} | ${t('app.prefix')}` })
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
