<template>
  <section>
    <div class="status">
      <h1>{{ t('pages.my-case-details.title') }}</h1>
      <CaseStatus type="new" />
    </div>
    <TabGroup
      as="div"
      class="tabs filter-tabs"
      v-bind="{ defaultIndex }"
      @change="onTabChange"
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
            {{ t('pages.my-case-details.overview') }}
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
            {{ t('pages.my-case-details.history') }}
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
            {{ t('pages.my-case-details.reviewer') }}
          </AppButton>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          v-for="({ component }, index) in tabs"
          :key="`tab-${index}`"
        >
          <component
            :is="component"
            v-bind="{ id }"
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import AppButton from '@shared/components/AppButton/AppButton.vue'
import CaseHistory from '@assessment/components/CaseHistory/CaseHistory.vue'
import CaseReviewers from '@assessment/components/CaseReviewers/CaseReviewers.vue'
import CaseOverview from '@assessment/components/CaseOverview/CaseOverview.vue'
import CaseStatus from '@assessment/components/CaseStatus/CaseStatus.vue'

import {
  MY_CASE_DETAILS,
  MY_CASE_DETAILS_HISTORY,
  MY_CASE_DETAILS_REVIEWER
} from '@assessment/router/names'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const router = useRouter()

useSEO({ title: `${t('pages.my-case-details.title')} | ${t('app.prefix')}` })

const tabs = [
  { component: CaseOverview, name: MY_CASE_DETAILS },
  { component: CaseHistory, name: MY_CASE_DETAILS_HISTORY },
  { component: CaseReviewers, name: MY_CASE_DETAILS_REVIEWER }
]

const selectedIndex = ref<number>(0)
const defaultIndex = ref<number>(0)

onBeforeMount(() => {
  const tabIndex = tabs.findIndex(({ name }) => router.currentRoute.value.name === name)

  defaultIndex.value = Math.max(0, tabIndex)
  selectedIndex.value = defaultIndex.value
})

function onTabChange(index: number) {
  selectedIndex.value = index
}

watch(
  selectedIndex,
  (selectedIndex) => {
    const { name } = tabs[selectedIndex]
    router.replace({ name, params: props })
  },
  { immediate: true }
)
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
    top: calc(100% + 1px);
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
