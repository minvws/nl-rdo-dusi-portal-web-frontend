<template>
  <section>
    <AppIntro
      v-if="data?.subsidy?.title"
      v-bind="{
        title: 'Aanvraag subsidie: ' + data.subsidy.title
      }"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <RequestDetailsForm
        :id="data.form.id"
        :values="data.data"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useFetchRequestDetails } from '@portal/composables/useFetchRequestDetails'
import useSEO from '@shared/composables/useSeo'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestDetailsForm from '@portal/components/RequestDetailsForm/RequestDetailsForm.vue'

type Props = {
  reference: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-status.title')}`
})

const { data, error, isFetching } = useFetchRequestDetails(props.reference)
</script>
