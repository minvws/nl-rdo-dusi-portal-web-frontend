<template>
  <section>
    <div class="status">
      <h1>{{ t('pages.new-review.title') }}</h1>
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
            {{ t('pages.new-review.overview') }}
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
            {{ t('pages.new-review.history') }}
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
            {{ t('pages.new-review.reviewer') }}
          </AppButton>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RequestDetails :items="details" />
          <RouterLink
            :to="{ name: 'review-request', params: { id: id } }"
            class="button"
          >
            {{ t('pages.new-review.startAssessment') }}
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
import { useI18n } from 'vue-i18n'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import AppButton from '@/shared/components/AppButton/AppButton.vue'
import RequestDetails from '@/shared/components/RequestDetails/RequestDetails.vue'
import RequestHistory from '@/shared/components/RequestHistory/RequestHistory.vue'
import RequestReviewers from '@/shared/components/RequestReviewers/RequestReviewers.vue'
import RequestStatus from '@/shared/components/RequestStatus/RequestStatus.vue'

import type { RequestDetailsItem } from '@/shared/type/details-types'

type Props = {
  details: RequestDetailsItem[]
  id: string
}

defineProps<Props>()

const { t } = useI18n()
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
