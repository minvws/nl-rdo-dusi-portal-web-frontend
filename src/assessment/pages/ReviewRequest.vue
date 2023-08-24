<template>
  <section>
    <div>
      <h1>{{ translate('pages.review-request.title') }}</h1>
    </div>
    <div>
      <AppAccordion>
        <AppAccordionItem id="request">
          <template #title>{{ translate('pages.review-request.request') }}</template>
          <template #content>
            <Suspense>
              <template #default>
                <AppLoader
                  v-if="isFetchingDetails"
                  centered
                />
                <div v-else-if="detailsError">
                  <FormNotification
                    display-as="error"
                    :message="detailsError"
                  />
                </div>
                <RequestDetails
                  v-else-if="!isFetchingDetails && details.length"
                  :items="details"
                />
              </template>
              <template #fallback>
                <AppLoader centered />
              </template>
            </Suspense>
          </template>
        </AppAccordionItem>
      </AppAccordion>
    </div>
    <Suspense>
      <template #default>
        <AppLoader
          v-if="isFetchingAssessment"
          centered
        />
        <div v-else-if="assessmentError">
          <FormNotification
            display-as="error"
            :message="assessmentError"
          />
        </div>
        <div v-else-if="!isFetchingAssessment && reviews.length">
          <FormView
            id="review-request"
            :forms="reviews"
            :hide-debug="true"
            @submit="onSubmit"
          />
        </div>
      </template>
      <template #fallback>
        <AppLoader centered />
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useFetchAssessment } from '@assessment/composables/useFetchAssessment'
import { useFetchDetails } from '@assessment/composables/useFetchDetails'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'

import type { FormData } from '@shared/types/form'

type Props = {
  id: string
}

const props = defineProps<Props>()

const {
  data: reviews,
  error: assessmentError,
  isFetching: isFetchingAssessment
} = useFetchAssessment(props.id as string)

const {
  data: details,
  error: detailsError,
  isFetching: isFetchingDetails
} = useFetchDetails(props.id as string)

function onSubmit(data: FormData) {
  console.log('@TODO: onSubmit', data)
}
</script>
