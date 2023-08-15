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
        hideDebug: true
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue'
import type { Form } from '@shared/types/form'
import type { FormOptions } from '@shared/types/form-options'
import FormView from '@shared/components/FormView/FormView.vue'
import vFilters from '@shared/directives/filters'
import { filterOptionsLoader } from '@shared/utils/loader'

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
</script>
