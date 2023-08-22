<template>
  <div
    v-if="forms"
    class="filter"
    v-filters
  >
    <div><slot /></div>
    <FormView
      v-bind="{
        id: type,
        forms,
        hideDebug: true,
        buttonLabels: { submit: translate('component.filterOptions.submit') }
      }"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Form } from '@shared/types/form'
import type { FormOptions } from '@shared/types/form-options'

import { ref, watch, type Ref } from 'vue'
import { filterOptionsLoader } from '@shared/utils/loader'
import { translate } from '@shared/i18n'

import FormView from '@shared/components/FormView/FormView.vue'
import vFilters from '@shared/directives/filters'

type Props = {
  type: FormOptions
}
const props = defineProps<Props>()

const forms: Ref<Form[] | undefined> = ref(undefined)

watch(
  () => props.type,
  async type => {
    try {
      const value = await filterOptionsLoader(type)
      forms.value = value?.default
    } catch {
      forms.value = []
    }
  },
  { immediate: true }
)

const onSubmit = (data: FormData) => {
  console.log('@TODO: onSubmit', data)
}
</script>
