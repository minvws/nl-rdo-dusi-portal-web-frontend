<template>
  <div class="iban-check">
    <div>
      <h1>{{ t('component.ibanCheck.title') }}</h1>
      <p>{{ t('component.ibanCheck.intro') }}</p>
    </div>
    <div class="included">
      <AppHtml
        as="p"
        :html="t('component.ibanCheck.includeIntro')"
      />
      <AppHtml
        as="ul"
        :html="t('component.ibanCheck.includedList')"
      />
    </div>
    <div class="excluded">
      <AppHtml
        as="p"
        :html="t('component.ibanCheck.excludeIntro')"
      />
      <AppHtml
        as="ul"
        :html="t('component.ibanCheck.excludedList')"
      />
    </div>
    <AppSuspense
      v-bind="{ data: subsidies, error: subsidiesError, isFetching: isFetchingSubsidies }"
    >
      <h3>{{ t('component.ibanCheck.formTitle') }}</h3>
      <form @submit.prevent.stop>
        <label for="available-subsidies">{{ t('component.ibanCheck.label') }}</label>
        <select
          id="available-subsidies"
          aria-controls="iban-check-info"
          v-model="selectedId"
        >
          <option
            value=""
            :label="t('component.ibanCheck.placeholder')"
            disabled
          />
          <option
            v-for="item in subsidies"
            :key="item.id"
            :value="item.id"
          >
            {{ item.title }}
          </option>
        </select>
      </form>
      <div
        id="iban-check-info"
        class="visually-hidden"
        role="region"
        aria-live="polite"
        aria-atomic="true"
      >
        <p v-if="selectedSubsidy">
          {{ t('component.ibanCheck.ariaResults', { subsidy: selectedSubsidy.title }) }}
        </p>
        <p v-else>{{ t('component.ibanCheck.ariaNoResults') }}</p>
      </div>
      <template #fallback>
        <div class="no-results">
          <p>{{ t('component.ibanCheck.noSubsidies') }}</p>
        </div>
      </template>
    </AppSuspense>
    <AppSuspense
      v-if="selectedId"
      class="iban-check-results-table"
      v-bind="{ data, error, isFetching }"
    >
      <h4>{{ t('component.ibanCheck.results') }}</h4>
      <IbanCheckTable
        v-if="data.length > 0"
        :data="data"
      />
      <template #fallback>
        <div class="no-results">
          <p>{{ t('component.ibanCheck.noResults') }}</p>
        </div>
      </template>
    </AppSuspense>
    <div class="horizontal-view">
      <RouterLink
        class="ghost button"
        exact-active-class="active"
        :to="{ name: CHECKS_OVERVIEW }"
      >
        <AppIcon
          name="chevron-left"
          aria-hidden
        />
        {{ t('component.ibanCheck.overview') }}
      </RouterLink>
      <AppButton
        :disabled="isFetching || !selectedId"
        @click="onClickRetry"
      >
        {{ t('component.ibanCheck.retry') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchIbanCheck } from '@assessment/composables/useFetchIbanCheck'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import IbanCheckTable from '@assessment/components/IbanCheckTable/IbanCheckTable.vue'

import { CHECKS_OVERVIEW } from '@assessment/router/names'

const { t } = useI18n()
const {
  data,
  error,
  isFetching,
  selectedId,
  subsidies,
  subsidiesError,
  isFetchingSubsidies,
  execute
} = useFetchIbanCheck()

const selectedSubsidy = computed<Record<string, string> | undefined>(() =>
  subsidies.value.find((subsidy: Record<string, string>) => subsidy.id === selectedId.value)
)

function onClickRetry() {
  execute()
}
</script>

<style lang="scss" scoped>
.iban-check {
  --section-content-wrapper-gap: 2rem;
  --form-base-padding-bottom: 2rem;

  width: 100%;
}

.iban-check-results-table {
  width: 100%;
}

.included,
.excluded {
  --section-content-wrapper-gap: 0.5rem;
}

.no-results {
  width: 100%;
  background-color: var(--form-base-background-color);

  p {
    padding: 2rem;
  }
}
</style>
