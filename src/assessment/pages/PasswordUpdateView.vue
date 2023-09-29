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
          id: 'password-update',
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
import { usePasswordUpdate } from '@assessment/composables/usePasswordUpdate'

import FormView from '@shared/components/FormView/FormView.vue'

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.update-password.title')}` })

const { forms, onSubmit } = usePasswordUpdate()
</script>

<style lang="scss" scoped>
main section div {
  --section-content-wrapper-max-width: 768px;
}
</style>
