<template>
  <div class="iban-check">
    <div>
      <h1>{{ translate('component.ibanCheck.title') }}</h1>
      <p>{{ translate('component.ibanCheck.intro') }}</p>
    </div>
    <div class="included">
      <AppHtml
        as="p"
        :html="translate('component.ibanCheck.includeIntro')"
      />
      <AppHtml
        as="ul"
        :html="translate('component.ibanCheck.includedList')"
      />
    </div>
    <div class="excluded">
      <AppHtml
        as="p"
        :html="translate('component.ibanCheck.excludeIntro')"
      />
      <AppHtml
        as="ul"
        :html="translate('component.ibanCheck.excludedList')"
      />
    </div>
    <AppSuspense
      v-bind="{ data: subsidies, error: subsidiesError, isFetching: isFetchingSubsidies }"
    >
      <h3>{{ translate('component.ibanCheck.formTitle') }}</h3>
      <form @submit.prevent.stop>
        <label for="available-subsidies">{{ translate('component.ibanCheck.label') }}</label>
        <select
          id="available-subsidies"
          v-model="selectedId"
        >
          <option
            value=""
            :label="translate('component.ibanCheck.placeholder')"
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
      <template #fallback>
        <div class="no-results">
          <p>{{ translate('component.ibanCheck.noSubsidies') }}</p>
        </div>
      </template>
    </AppSuspense>
    <AppSuspense
      v-if="selectedId"
      class="iban-check-results-table"
      v-bind="{ data, error, isFetching }"
    >
      <h4>{{ translate('component.ibanCheck.results') }}</h4>
      <AppTable
        :data="data"
        :columns="columns"
        :items-per-page="10"
      />
      <template #fallback>
        <div class="no-results">
          <p>{{ translate('component.ibanCheck.noResults') }}</p>
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
          aria-hidden="true"
        />
        {{ translate('component.ibanCheck.overview') }}
      </RouterLink>
      <AppButton
        :disabled="isFetching || !selectedId"
        @click="onClickRetry"
      >
        {{ translate('component.ibanCheck.retry') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchIbanCheck } from '@assessment/composables/useFetchIbanCheck'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'

import { CHECKS_OVERVIEW } from '@assessment/router/names'

import { translate } from '@shared/i18n'

const {
  columns,
  data,
  error,
  isFetching,
  selectedId,
  subsidies,
  subsidiesError,
  isFetchingSubsidies,
  execute
} = useFetchIbanCheck()

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
