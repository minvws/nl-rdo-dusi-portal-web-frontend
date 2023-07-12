<template>
  <div class="form-results-table">
    <div
      :key="`row-${index}`"
      class="form-results-table-row"
      v-for="(id, index) in appliedOptions.fields"
    >
      <div>{{ translate(`component.formResultsTable.results.${id}.label`, fromData) }}</div>
      <div>{{ translate(`component.formResultsTable.results.${id}.value`, fromData) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useFormStore } from '@/store/useFormStore'

import { translate } from '@/i18n'

export default defineComponent({
  props: {
    ...rendererProps<ControlElement>()
  },
  setup(props) {
    const { formData } = useFormStore()
    return {
      ...useVanillaControl(useJsonFormsControl(props)),
      fromData: formData as Record<string, string>,
      translate
    }
  }
})
</script>

<style lang="scss" scoped>
.form-results-table {
  &-row {
    div {
      padding: 0.5rem 1rem;
      width: 70%;
      background-color: var(--grey-1);

      &:first-child {
        width: 30%;
        background-color: var(--grey-2);
      }
    }
  }
}
</style>
