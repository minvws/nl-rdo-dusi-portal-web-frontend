<template>
  <div
    v-if="forms"
    class="filter"
    v-filters
  >
    <slot />
    <FormView
      v-bind="{
        id: 'request-filter',
        forms
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { Form } from '@shared/types/form'
import FormView from '@shared/components/FormView/FormView.vue'
import FormRequestFilter from '@shared/unit/fixtures/form/FormRequestFilter'
import vFilters from '@shared/directives/filters'

const forms: Ref<Form[] | undefined> = ref(undefined)
FormRequestFilter().then(value => (forms.value = value))
</script>
