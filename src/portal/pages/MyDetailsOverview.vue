<template>
  <section>
    <div>
      <h1>{{ translate('pages.my-details-overview.title') }}</h1>
      <p>{{ translate('pages.my-details-overview.intro1') }}</p>
      <p>{{ translate('pages.my-details-overview.intro2') }}</p>
    </div>
    <AppSuspense v-bind="{ data: details, error, isFetching }">
      <FormView
        v-bind="{
          id: 'my-details',
          forms: details,
          values,
          hideDebug: true,
          noStyle: true,
          noButtons: true
        }"
      />
      <RouterLink
        class="button"
        :to="{ name: MY_DETAILS_EDIT }"
      >
        {{ translate('pages.my-details-overview.edit') }}
      </RouterLink>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'

import { useFetchPersonalDetails } from '@portal/composables/useFetchPersonalDetails'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

import { MY_DETAILS_EDIT } from '@portal/router/names'

useSEO({
  title: `${translate('pages.my-details-overview.title')} | ${translate('app.prefix')}`
})

const { data: details, error, isFetching, values } = useFetchPersonalDetails({ editable: false })
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}

main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
