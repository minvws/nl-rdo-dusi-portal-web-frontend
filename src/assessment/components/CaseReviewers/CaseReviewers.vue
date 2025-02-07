<template>
  <AppSuspense v-bind="{ data, error, isFetching }">
    <div class="case-reviewers">
      <p>
        {{ t('component.caseReviewers.intro') }}
      </p>
      <p>
        {{ t('component.caseReviewers.handledBy') }}
      </p>
      <p>
        <strong>{{ data.name }}</strong>
      </p>

      <AppButton
        class="ghost"
        @click="onRemove"
      >
        {{ t('component.caseReviewers.removeReviewer') }}
      </AppButton>
    </div>
    <template #fallback>
      {{ t('component.caseReviewers.noReviewers') }}
    </template>
  </AppSuspense>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useFetchCaseReviewer } from '@assessment/composables/useFetchCaseReviewer'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { data, error, isFetching } = useFetchCaseReviewer(props.id)

function onRemove() {
  /* ... */
}
</script>
