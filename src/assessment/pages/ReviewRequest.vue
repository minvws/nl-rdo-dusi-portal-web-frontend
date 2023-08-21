<template>
  <section>
    <div>
      <h1>{{ translate('pages.review-request.title') }}</h1>
    </div>
    <div>
      <AppAccordion>
        <AppAccordionItem
          id="request"
          is-open
        >
          <template #title>{{ translate('pages.review-request.request') }}</template>
          <template #content>
            <Suspense>
              <template #default>
                <AppLoader
                  v-if="isFetching"
                  centered
                />
                <div v-else-if="error">Error: {{ error }}</div>
                <template v-else-if="!isFetching && activeAssessmentRequest">
                  <RequestDetails :items="items" />
                </template>
                <p v-else>Geen details beschikbaar</p>
              </template>
              <template #fallback>
                <AppLoader centered />
              </template>
            </Suspense>
          </template>
        </AppAccordionItem>
      </AppAccordion>
    </div>
    <div>
      <form>@TODO: FormView</form>
    </div>
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
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'

const assessmentStore = useAssessmentStore()
const route = useRoute()

const { id } = route.params
const { activeAssessmentRequest, activeAssessmentRequestValues, isFetching, error } =
  storeToRefs(assessmentStore)

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
</script>
