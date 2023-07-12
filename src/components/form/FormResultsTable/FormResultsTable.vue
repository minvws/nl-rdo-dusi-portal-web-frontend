<template>
  <div class="form-results-table">
    <div
      :key="`row-${index}`"
      class="form-results-table-row"
      v-for="(value, label) in appliedOptions.fields"
    >
      <div>{{ label }}</div>
      <div>{{ tpl(value, fromData) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ControlElement, JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { rankWith } from '@jsonforms/core'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useFormStore } from '@/store/useFormStore'

import { translate } from '@/i18n'

const tpl = function (template: string, props: Record<string, string>) {
  let result: string = template
  const regex = /\{([a-zA-Z]+)\}/g
  Array.from(template.matchAll(regex)).forEach((m) => result = result.replace('{' + m[1] + '}', (props[m[1]] ?? '') + ''))
  return result
}

const Component = defineComponent({
  props: {
    ...rendererProps<ControlElement>()
  },
  methods: {
    tpl
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

export default Component

export const FormResultsTableRenderer: JsonFormsRendererRegistryEntry = {
  renderer: Component,
  tester: rankWith(1, ({ type }) => {
    return type === 'FormResultsTable'
  })
}
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
