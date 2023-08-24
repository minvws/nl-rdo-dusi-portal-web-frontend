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
              <template v-else-if="!isFetching && data.length">
                <RequestDetails :items="data" />
                <RouterLink
                  :to="startReviewRoute"
                  class="button"
                >
                  {{ translate('component.reviewRequestOverview.startReview') }}
                </RouterLink>
              </template>
            </template>
            <template #fallback>
              <AppLoader centered />
            </template>
          </Suspense>
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
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { translate } from '@shared/i18n'

import { useFetchDetails } from '@assessment/composables/useFetchDetails'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import RequestDetails from '@assessment/components/RequestDetails/RequestDetails.vue'
import RequestHistory from '@assessment/components/RequestHistory/RequestHistory.vue'
import RequestReviewers from '@assessment/components/RequestReviewers/RequestReviewers.vue'
import RequestStatus from '@assessment/components/RequestStatus/RequestStatus.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { data, error, isFetching } = useFetchDetails(props.id as string)

const startReviewRoute = computed(() => ({
  name: 'review-request',
  params: { id: props.id }
}))
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
