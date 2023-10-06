<template>
  <section>
    <AppIntro
      v-bind="{
        title: translate('pages.password-reset.title'),
        body: translate('pages.password-reset.body')
      }"
    />
    <div>
      <FormView
        v-bind="{
          id: 'password-reset',
          forms,
          hideDebug: true,
          buttonLabels: { submit: translate('pages.update-password.submit') }
        }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'
import { usePasswordReset } from '@assessment/composables/usePasswordReset'

import AppIntro from '@/@shared/components/AppIntro/AppIntro.vue'
import FormView from '@shared/components/FormView/FormView.vue'

useSEO({ title: `${translate('pages.password-reset.title')} | ${translate('app.prefix')}` })

const { forms, onSubmit } = usePasswordReset()
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
