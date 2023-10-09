<template>
  <AppSuspense
    v-bind="{
      data,
      error,
      isFetching
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
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { translate } from '@shared/i18n'

import { useFetchCase } from '@assessment/composables/useFetchCase'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import FormView from '@shared/components/FormView/FormView.vue'

type Props = {
  id: string
}

const props = defineProps<Props>()

const formViewOptions = {
  hideDebug: true,
  noStyle: true,
  noButtons: true
}

const { data, error, isFetching, caseDetail, caseStage, caseStageId } = useFetchCase(props.id)

const startReviewRoute = computed(() => ({
  name: 'review-case',
  params: { id: props.id }
}))
</script>
