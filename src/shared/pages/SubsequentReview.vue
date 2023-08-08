<template>
  <section>
    <div>
      <h1>{{ t('pages.subsequent-review.title') }}</h1>
    </div>
    <div>
      <AppAccordion>
        <AppAccordionItem
          :id="t('pages.subsequent-review.request')"
          is-open
        >
          <template #title>{{ t('pages.subsequent-review.request') }}</template>
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
              {{ t('pages.subsequent-review.review') }}
            </label>
            <div class="radio">
              <input
                type="radio"
                id="radio-1"
                name="standaard-radio"
              />
              <label for="radio-1">{{ t('pages.subsequent-review.disagree') }}</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="radio-2"
                name="standaard-radio"
              />
              <label for="radio-2">{{ t('pages.subsequent-review.agree') }}</label>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          @click="onClick"
        >
          {{ t('pages.subsequent-review.saveAndSend') }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppAccordion from '@/shared/components/AppAccordion/AppAccordion.vue'
import AppAccordionItem from '@/shared/components/AppAccordionItem/AppAccordionItem.vue'
import RequestDetails from '@/shared/components/RequestDetails/RequestDetails.vue'

import type { RequestDetailsItem } from '@/shared/type/details-types'

type Props = {
  details: RequestDetailsItem[]
}

defineProps<Props>()

const { t } = useI18n()

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
