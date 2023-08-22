<template>
  <section>
    <div class="status">
      <h1>{{ translate('component.reviewRequestOverview.title') }}</h1>
      <RequestStatus type="new" />
    </div>
    <TabGroup
      as="div"
      class="tabs filter-tabs"
    >
      <TabList as="ul">
        <Tab
          as="li"
          v-slot="{ selected }"
        >
          <AppButton
            class="button"
            :class="{ selected }"
          >
            {{ translate('component.reviewRequestOverview.overview') }}
          </AppButton>
        </Tab>
        <Tab
          as="li"
          v-slot="{ selected }"
        >
          <AppButton
            class="button"
            :class="{ selected }"
          >
            {{ translate('component.reviewRequestOverview.history') }}
          </AppButton>
        </Tab>
        <Tab
          as="li"
          v-slot="{ selected }"
        >
          <AppButton
            class="button"
            :class="{ selected }"
          >
            {{ translate('component.reviewRequestOverview.reviewer') }}
          </AppButton>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RequestDetails :items="items" />
          <RouterLink
            :to="{
              name: 'review-request',
              params: { id: metadata.id }
            }"
            class="button"
          >
            {{ translate('component.reviewRequestOverview.startReview') }}
          </RouterLink>
        </TabPanel>
        <TabPanel>
          <RequestHistory />
        </TabPanel>
        <TabPanel>
          <RequestReviewers reviewer="Bram Adema" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { translate } from '@shared/i18n'

import { useAssessmentStore } from '@shared/store/useAssessmentStore'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'
import RequestHistory from '@assessment/components/RequestHistory/RequestHistory.vue'
import RequestReviewers from '@assessment/components/RequestReviewers/RequestReviewers.vue'
import RequestStatus from '@assessment/components/RequestStatus/RequestStatus.vue'

import type { DescriptionListItem, RequestDetailsItem } from '@shared/types/details'

type Props = {
  metadata: Record<string, string>
}

defineProps<Props>()

const assessmentStore = useAssessmentStore()

const { activeAssessmentRequestValues } = storeToRefs(assessmentStore)

//@TODO: remove when we get the correct data from the back-end.
const items = computed((): RequestDetailsItem[] => {
  return [
    {
      title: 'Gegevens',
      items: activeAssessmentRequestValues.value.map(
        (item: Record<string, string>): DescriptionListItem => {
          const key = Object.keys(item)[0]
          return {
            term: key,
            details: { type: 'string', text: item[key] }
          }
        }
      )
    }
  ]
})
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.tabs div {
  width: 100%;
}

.filter-tabs ul .button {
  --button-base-background-color: transparent;
  --button-base-border-color: transparent;
  --button-base-text-color: var(--grey-5);
  --button-base-hover-background-color: transparent;
  --button-base-hover-text-color: var(--grey-5);
  --button-base-focus-background-color: transparent;
  --button-base-focus-text-color: var(--grey-5);
  --button-base-focus-border-color: transparent;
  --button-base-active-background-color: transparent;
  --button-base-active-text-color: var(--grey-5);
  --button-base-active-border-color: transparent;
}

.filter-tabs ul .button.selected {
  --button-base-selected-background-color: transparent;
  --button-base-selected-text-color: var(--ruby-red-text-color-dark);

  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--ruby-red-text-color-dark);
  }
}

.filter-tabs ul .button.selected:not(:focus) {
  outline: none;
}

.filter-tabs ul .button.selected:disabled {
  --disabled-cursor: pointer;
  --disabled-opacity: 1;
}
</style>
