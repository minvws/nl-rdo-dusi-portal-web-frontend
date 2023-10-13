<template>
  <section>
    <div>
      <h1>{{ translate('pages.update-password.title') }}</h1>
    </div>
    <div>
      <p>
        {{ translate('pages.update-password.intro') }}
      </p>
      <p>
        {{ translate('pages.update-password.requirements') }}
      </p>
    </div>
    <div>
      <FormView
        v-bind="{
          id: 'password-reset',
          forms,
          hideDebug: true,
          locked: isFetching,
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
import { useRoute } from 'vue-router'

import FormView from '@shared/components/FormView/FormView.vue'

useSEO({ title: `${translate('pages.password-reset.title')} | ${translate('app.prefix')}` })

const route = useRoute()

const { forms, isFetching, onSubmit } = usePasswordReset(route.query)
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
