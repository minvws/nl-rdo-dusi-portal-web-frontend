<template>
  <section>
    <AppIntro
      v-bind="{
        title: translate('pages.forgot-password.title'),
        body: translate('pages.forgot-password.body')
      }"
    />
    <div>
      <FormView
        v-bind="{
          id: 'forgot-password',
          locked: isFetching,
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
import { useForgotPassword } from '@assessment/composables/useForgotPassword'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import FormView from '@shared/components/FormView/FormView.vue'

useSEO({ title: `${translate('pages.forgot-password.title')} | ${translate('app.prefix')}` })

const { forms, onSubmit, isFetching } = useForgotPassword()
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
