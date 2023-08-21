<template>
  <section>
    <div>
      <h1>{{ translate('pages.review-request.title') }}</h1>
    </div>
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetching"
          centered
        />
        <div v-else-if="error">
          <FormNotification
            display-as="error"
            :message="error"
          />
        </div>
        <template v-else-if="!isFetching && activeAssessment">
          <div>
            <AppAccordion>
              <AppAccordionItem id="request">
                <template #title>{{ translate('pages.review-request.request') }}</template>
                <template #content>
                  <RequestDetails :items="items" />
                </template>
              </AppAccordionItem>
            </AppAccordion>
          </div>
          <div v-if="activeAssessmentReviewForm">
            <FormView
              id="987vet789ve9n78x"
              :forms="activeAssessmentReviews"
              :hide-debug="true"
              @submit="onSubmit"
            />
          </div>
        </template>
        <p v-else>Geen details beschikbaar</p>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useAssessmentStore } from '@shared/store/useAssessmentStore'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'

import type { FormData } from '@shared/types/form'
import type { DescriptionListItem, RequestDetailsItem } from '@shared/types/details'

const assessmentStore = useAssessmentStore()
const route = useRoute()

const { id } = route.params
const {
  activeAssessment,
  activeAssessmentReviews,
  activeAssessmentReviewForm,
  activeAssessmentRequestValues,
  isFetching,
  error
} = storeToRefs(assessmentStore)

onBeforeMount(() => assessmentStore.fetchAssessment(id as string))

//@TODO: remove when we get the correct data from the back-end.
const items = computed((): RequestDetailsItem[] => {
  return [
    {
      title: 'Gegevens',
      items: activeAssessmentRequestValues.value.map((item: Record<string, string>): DescriptionListItem => {
        const key = Object.keys(item)[0]
        return {
          term: key,
          details: { type: 'string', text: item[key] }
        }
      })
    }
  ]
})

function onSubmit(data: FormData) {
  console.log('@TODO: onSubmit', data)
}
</script>
