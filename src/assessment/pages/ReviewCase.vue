<template>
  <section>
    <div>
      <h1>{{ translate('pages.review-case.title', {}, reviewNumber) }}</h1>
    </div>
    <AppSuspense v-bind="{ data: details, error: detailsError, isFetching: isFetchingDetails }">
      <AppAccordion>
        <AppAccordionItem id="case">
          <template #title>{{ translate('pages.review-case.case') }}</template>
          <template #content>
            <CaseDetails :items="details" />
          </template>
        </AppAccordionItem>
      </AppAccordion>
    </AppSuspense>
    <AppSuspense v-bind="{ data: caseData, error: caseError, isFetching: isFetchingCase }">
      <FormView
        id="review-case"
        :forms="caseData"
        :hide-debug="true"
        @submit="onSubmit"
      />
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { translate } from '@shared/i18n'

import { useFetchCase } from '@assessment/composables/useFetchCase'
import { useFetchCaseDetails } from '@assessment/composables/useFetchCaseDetails'
import useSEO from '@shared/composables/useSeo'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import CaseDetails from '@assessment/components/CaseDetails/CaseDetails.vue'

import type { FormData } from '@shared/types/form'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({ title: `${translate('app.prefix')} | ${translate('pages.review-case.title', {}, 3)}` })

const {
  data: caseData,
  error: caseError,
  isFetching: isFetchingCase
} = useFetchCase(props.id as string)

const {
  data: details,
  error: detailsError,
  isFetching: isFetchingDetails
} = useFetchCaseDetails(props.id as string)

const reviewNumber = computed(() => 1)

function onSubmit(data: FormData) {
  console.log('@TODO: onSubmit', data)
}
</script>
