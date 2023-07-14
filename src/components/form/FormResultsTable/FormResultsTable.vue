<template>
  <div class="form-results-table">
    <div
      v-for="({ value, index }, label) in appliedOptions.fields"
      class="form-results-table-row"
      :key="`row-${index}`"
    >
      <div>{{ label }}</div>
      <div>{{ tpl(value, fromData) }}</div>
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

const tpl = function (template: string, props: Record<string, string>) {
  let result: string = template
  const regex = /\{([a-zA-Z]+)\}/g
  Array.from(template.matchAll(regex)).forEach(
    m => (result = result.replace('{' + m[1] + '}', (props[m[1]] ?? '') + ''))
  )
  return result
}

export default defineComponent({
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
