<template>
  <section>
    <AppIntro
      v-if="title"
      v-bind="{
        title
      }"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <RequestDetailsForm
        :id="data.form.id"
        :values="values"
        :reference="reference"
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
import { computed } from 'vue'

type Props = {
  reference: string
}

const props = defineProps<Props>()

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.my-request-status.title')}`
})

const { data, error, isFetching, values } = useFetchRequestDetails(props.reference)

const title = computed(() => {
  const title = data.value?.subsidy?.title
  return title ? translate('pages.my-request-status.heading', { title }) : undefined
})
</script>
