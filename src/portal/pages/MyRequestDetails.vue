<template>
  <section>
    <AppIntro
      v-if="title"
      v-bind="{
        title
      }"
    />
    <AppSuspense v-bind="{ data, error, isFetching }">
      <h2>{{ t('pages.my-request-details.meta') }}</h2>
      <DescriptionList :items="metaData" />
      <RequestDetailsForm
        :id="data.form.id"
        :values="values"
        :reference="reference"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchRequestDetails } from '@portal/composables/useFetchRequestDetails'
import { useSEO } from '@shared/composables/useSeo'

import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'
import RequestDetailsForm from '@portal/components/RequestDetailsForm/RequestDetailsForm.vue'

type Props = {
  reference: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { data, error, isFetching, values } = useFetchRequestDetails(props.reference)

useSEO({
  title: `${t('pages.my-request-details.title')} | ${t('app.prefix')}`
})

const title = computed<string | undefined>(() => {
  const title = data.value?.subsidy?.title
  return title ? t('pages.my-request-details.heading', { title }) : undefined
})

const metaData = computed(() => {
  const { deadlineForResponseAt, reference, submittedAt } = data.value
  return [
    {
      ...(reference && {
        term: t('pages.my-request-details.reference'),
        type: 'string',
        text: reference
      })
    },
    {
      ...(submittedAt && {
        term: t('pages.my-request-details.submittedAt'),
        type: 'date',
        text: submittedAt
      })
    },
    {
      ...(deadlineForResponseAt && {
        term: t('pages.my-request-details.deadline'),
        type: 'date',
        text: deadlineForResponseAt
      })
    }
  ]
})
</script>
