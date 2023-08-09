<template>
  <section>
    <div>
      <h1>{{ translate('pages.subsequent-review.title') }}</h1>
    </div>
    <div>
      <AppAccordion>
        <AppAccordionItem
          id="subsequent-review"
          is-open
        >
          <template #title>{{ translate('pages.subsequent-review.request') }}</template>
          <template #content>
            <RequestDetails :items="details" />
          </template>
        </AppAccordionItem>
      </AppAccordion>
    </div>
    <div>
      <!-- @TODO: add FormView-->
      <form class="horizontal-view">
        <fieldset>
          <legend>Checklist</legend>
          <div>
            <label for="keyword">
              {{ translate('pages.subsequent-review.review') }}
            </label>
            <div class="radio">
              <input
                type="radio"
                id="radio-1"
                name="standaard-radio"
              />
              <label for="radio-1">{{ translate('pages.subsequent-review.disagree') }}</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="radio-2"
                name="standaard-radio"
              />
              <label for="radio-2">{{ translate('pages.subsequent-review.agree') }}</label>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          @click="onClick"
        >
          {{ translate('pages.subsequent-review.saveAndSend') }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import AppAccordion from '@shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@shared/components/AppAccordionItem/AppAccordionItem.vue'
import RequestDetails from '@review/components/RequestDetails/RequestDetails.vue'

import type { RequestDetailsItem } from '@shared/types/details'

type Props = {
  details: RequestDetailsItem[]
}

defineProps<Props>()

function onClick(event: Event) {
  event.preventDefault()
  console.log('submit form')
}
</script>

<style lang="scss" scoped>
form {
  padding-bottom: 2rem;
}
</style>
