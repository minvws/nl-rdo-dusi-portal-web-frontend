<template>
  <section>
    <div>
      <h1>{{ translate('pages.login.title') }}</h1>
    </div>
    <div>
      <FormView
        v-bind="{
          id: 'login',
          forms,
          hideDebug: true,
          buttonLabels: { submit: translate('pages.login.submit') }
        }"
        @submit="onSubmit"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSEO } from '@shared/composables/useSeo'
import { usePasswordLogin } from '@assessment/composables/usePasswordLogin'

import FormView from '@shared/components/FormView/FormView.vue'

import { translate } from '@shared/i18n'

useSEO({ title: `${translate('pages.login.title')} | ${translate('app.prefix')}` })

const { forms, onSubmit } = usePasswordLogin()
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
