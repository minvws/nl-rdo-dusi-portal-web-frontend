<template>
  <section>
    <div>
      <h1>{{ t('pages.my-details-edit.title') }}</h1>
      <p>{{ t('pages.my-details-edit.intro') }}</p>
    </div>
    <AppSuspense v-bind="{ data, error, isFetching }">
      <FormView
        id="my-details-edit"
        :forms="data"
        :values="values"
        hide-debug
        :button-labels="{ submit: t('pages.my-details-edit.save') }"
        @submit="onSubmit"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchPersonalDetails } from '@portal/composables/useFetchPersonalDetails'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

const { t } = useI18n()
const { data, values, error, isFetching } = useFetchPersonalDetails({ editable: true })

useSEO({
  title: `${t('pages.my-details-edit.title')} | ${t('app.prefix')}`
})

function onSubmit() {
  /* ... */
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
