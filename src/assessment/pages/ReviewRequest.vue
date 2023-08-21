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
              <AppAccordionItem
                id="request"
              >
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
              :forms="forms"
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
const items = computed((): any => {
  const entries: any = Object.entries(activeAssessmentRequestValues.value)
  return [
    {
      title: 'Gegevens',
      // @ts-ignore:next-line
      data: entries.map(entry => {
        return {
          term: Object.keys(entry[1])[0],
          details: { type: 'string', text: Object.values(entry[1])[0] }
        }
      })
    }
  ]
})

const forms = computed(() => {
  return activeAssessmentReviews.value?.map((review: any) => review)
})

function onSubmit(data: any) {
  console.log('@TODO: onSubmit', data)
}
</script>
