<template>
  <section>
    <div>
      <h1>{{ t('pages.my-details-overview.title') }}</h1>
      <p>{{ t('pages.my-details-overview.intro1') }}</p>
      <p>{{ t('pages.my-details-overview.intro2') }}</p>
    </div>
    <AppSuspense v-bind="{ data: details, error, isFetching }">
      <FormView
        :forms="details"
        hide-debug
        id="my-details"
        no-buttons
        no-style
        :values="values"
      />
      <RouterLink
        class="button"
        :to="{ name: MY_DETAILS_EDIT }"
      >
        {{ t('pages.my-details-overview.edit') }}
      </RouterLink>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchPersonalDetails } from '@portal/composables/useFetchPersonalDetails'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

import { MY_DETAILS_EDIT } from '@portal/router/names'

const { t } = useI18n()
const { data: details, error, isFetching, values } = useFetchPersonalDetails({ editable: false })

useSEO({
  title: `${t('pages.my-details-overview.title')} | ${t('app.prefix')}`
})
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}

main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
