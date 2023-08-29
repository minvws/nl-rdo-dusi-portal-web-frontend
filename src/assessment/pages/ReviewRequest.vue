<template>
  <section>
    <div>
      <h1>{{ translate('pages.review-request.title', {}, reviewNumber) }}</h1>
    </div>
    <AppSuspense v-bind="{ data: details, error: detailsError, isFetching: isFetchingDetails }">
      <AppAccordion>
        <AppAccordionItem id="request">
          <template #title>{{ translate('pages.review-request.request') }}</template>
          <template #content>
            <RequestDetails :items="details" />
          </template>
        </AppAccordionItem>
      </AppAccordion>
    </AppSuspense>
    <AppSuspense
      v-bind="{ data: assessment, error: assessmentError, isFetching: isFetchingAssessment }"
    >
      <FormView
        id="review-request"
        :forms="assessment"
        :hide-debug="true"
        @submit="onSubmit"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

import { useFetchAssessment } from '@assessment/composables/useFetchAssessment'
import { useFetchDetails } from '@assessment/composables/useFetchDetails'
import useSEO from '@shared/composables/useSeo'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'

import type { FormData } from '@shared/types/form'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.review-request.title', {}, 3)}` })

const {
  data: assessment,
  error: assessmentError,
  isFetching: isFetchingAssessment
} = useFetchAssessment(props.id as string)

const {
  data: details,
  error: detailsError,
  isFetching: isFetchingDetails
} = useFetchDetails(props.id as string)

const reviewNumber = computed(() => 1)

function onSubmit(data: FormData) {
  console.log('@TODO: onSubmit', data)
}
</script>
