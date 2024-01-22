<template>
  <AppSuspense v-bind="{ data, error, isFetching }">
    <div class="case-reviewers">
      <p>
        {{ translate('component.caseReviewers.intro') }}
      </p>
      <p>
        {{ translate('component.caseReviewers.handledBy') }}
      </p>
      <p>
        <strong>{{ data.name }}</strong>
      </p>

      <AppButton
        class="ghost"
        @click="onRemove"
      >
        {{ translate('component.caseReviewers.removeReviewer') }}
      </AppButton>
    </div>
    <template #fallback>
      {{ translate('component.caseReviewers.noReviewers') }}
    </template>
  </AppSuspense>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import { useFetchCaseReviewer } from '@assessment/composables/useFetchCaseReviewer'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { data, error, isFetching } = useFetchCaseReviewer(props.id)

function onRemove() {
  /* ... */
}
</script>
