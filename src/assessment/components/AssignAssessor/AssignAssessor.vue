<template>
  <div class="assign-user">
    <AppSuspense v-bind="{ data, error, isFetching }">
      <SearchDataList
        :label="translate('component.assignAssessor.label') ?? ''"
        :options="data"
        :placeholder="translate('component.assignAssessor.placeholder')"
        @select="onSelectUser"
      />
    </AppSuspense>
    <AppButton
      class="assign-user__button"
      @click="submit"
      :disabled="isDisabled"
    >
      {{ translate('component.assignAssessor.assign') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { OptionItem } from '@shared/components/SearchDataList/SearchDataList.vue'

import { computed, ref } from 'vue'

import { useFetchAssessors } from '@assessment/composables/useFetchAssessors'
import { useAssignCaseAssessor } from '@assessment/composables/useAssignCaseAssessor'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import SearchDataList from '@shared/components/SearchDataList/SearchDataList.vue'

import { translate } from '@shared/i18n'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { data, error, isFetching } = useFetchAssessors(props.id)
const { onSubmitCaseAssessor } = useAssignCaseAssessor()

const selectedUser: Ref<OptionItem | null> = ref(null)

const isDisabled = computed(() =>
  Boolean(
    selectedUser.value &&
      !Object.prototype.hasOwnProperty.call(selectedUser.value, 'id') &&
      !Object.prototype.hasOwnProperty.call(selectedUser.value, 'name')
  )
)

function onSelectUser(user: OptionItem) {
  selectedUser.value = user
}

function submit() {
  if (!selectedUser.value) {
    return
  }

  onSubmitCaseAssessor(props.id, selectedUser.value?.id)
}
</script>

<style>
.assign-user__button {
  margin-top: 1rem;
}
</style>
