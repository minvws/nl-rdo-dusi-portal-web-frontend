<template>
  <section>
    <div class="status">
      <h1>{{ translate('pages.my-case-details.title') }}</h1>
      <CaseStatus type="new" />
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
            {{ translate('pages.my-case-details.overview') }}
          </AppButton>
        </Tab>
        <Tab
          v-if="enabledFeature"
          as="li"
          v-slot="{ selected }"
        >
          <AppButton
            class="button"
            :class="{ selected }"
          >
            {{ translate('pages.my-case-details.history') }}
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
            {{ translate('pages.my-case-details.reviewer') }}
          </AppButton>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AppSuspense
            v-bind="{
              data: caseData,
              error: caseError,
              isFetching: isFetchingCase
            }"
          >
            <FormView
              v-bind="{
                id: 'my-details-application',
                ...formViewOptions,
                ...caseDetail
              }"
            />
            <FormView
              v-if="caseStage"
              v-bind="{
                id: `${props.id}/stages/${caseStageId}`,
                ...formViewOptions,
                ...caseStage
              }"
            />
            <RouterLink
              class="button"
              :to="startReviewRoute"
              :text="translate('pages.my-case-details.startReview')"
            />
          </AppSuspense>
        </TabPanel>
        <TabPanel v-if="enabledFeature">
          <AppSuspense
            v-bind="{ data: history, error: historyError, isFetching: isFetchingHistory }"
          >
            <CaseHistory :items="history" />
          </AppSuspense>
        </TabPanel>
        <TabPanel>
          <AppSuspense
            v-bind="{ data: reviewer, error: reviewerError, isFetching: isFetchingReviewer }"
          >
            <CaseReviewers :name="reviewer.name" />
          </AppSuspense>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { translate } from '@shared/i18n'

import { useFetchCaseHistory } from '@assessment/composables/useFetchCaseHistory'
import { useFetchCaseReviewer } from '@assessment/composables/useFetchCaseReviewer'
import useSEO from '@shared/composables/useSeo'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import CaseHistory from '@assessment/components/CaseHistory/CaseHistory.vue'
import CaseReviewers from '@assessment/components/CaseReviewers/CaseReviewers.vue'
import CaseStatus from '@assessment/components/CaseStatus/CaseStatus.vue'
import FormView from '@shared/components/FormView/FormView.vue'
import { useFetchCase } from '@assessment/composables/useFetchCase'

const enabledFeature = import.meta.env.VITE_DISABLE_MVP_FEATURES === 'false'

type Props = {
  id: string
}

const props = defineProps<Props>()
useSEO({ title: `${translate('app.prefix')} | ${translate('pages.my-case-details.title')}` })

const formViewOptions = {
  hideDebug: true,
  noStyle: true,
  noButtons: true
}
const {
  data: caseData,
  error: caseError,
  isFetching: isFetchingCase,
  caseDetail,
  caseStage,
  caseStageId
} = useFetchCase(props.id as string)

const {
  data: history,
  error: historyError,
  isFetching: isFetchingHistory
} = useFetchCaseHistory(props.id as string)

const {
  data: reviewer,
  error: reviewerError,
  isFetching: isFetchingReviewer
} = useFetchCaseReviewer(props.id as string)

const startReviewRoute = computed(() => ({
  name: 'review-case',
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

:deep(.filter-tabs) {
  white-space: wrap !important;
}

:deep(.filter-tabs div) {
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
