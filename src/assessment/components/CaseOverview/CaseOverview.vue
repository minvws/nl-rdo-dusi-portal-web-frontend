<template>
  <AppSuspense
    v-bind="{
      data,
      error,
      isFetching
    }"
  >
    <FormView
      v-bind="{ ...caseDetail }"
      id="my-details-application"
      hide-debug
      no-style
      no-buttons
    />
    <FormView
      v-if="caseStage"
      v-bind="{ ...caseStage }"
      :id="`${props.id}/stages/${caseStageId}`"
      hide-debug
      no-style
      no-buttons
    />
    <RouterLink
      class="button"
      :to="startReviewRoute"
      :text="t('pages.my-case-details.startReview')"
    />
  </AppSuspense>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFetchCase } from '@assessment/composables/useFetchCase'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { data, error, isFetching, caseDetail, caseStage, caseStageId } = useFetchCase(props.id)

const startReviewRoute = computed<RouteLocationRaw>(() => ({
  name: 'review-case',
  params: { id: props.id }
}))
</script>
