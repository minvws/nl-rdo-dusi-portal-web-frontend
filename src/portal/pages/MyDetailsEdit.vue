<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-details-edit.title') }}</h1>
      <p>{{ translate('pages.my-details-edit.intro') }}</p>
    </div>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <FormView
        v-bind="{
          id: 'my-details-edit',
          forms: data,
          values,
          hideDebug: true,
          buttonLabels: { submit: translate('pages.my-details-edit.save') }
        }"
        @submit="onSubmit"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'

import { useFetchPersonalDetails } from '@portal/composables/useFetchPersonalDetails'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-details-edit.title')}`
})

const { data, values, error, isFetching } = useFetchPersonalDetails({ editable: true })

function onSubmit() {
  console.log('@TODO: save edited details')
}
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}

main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
