<template>
  <div class="form-results-table">
    <template v-if="!fields.length">
      <div
        v-for="([key, value], index) in fields"
        class="form-results-table-row"
        :key="`row-${index}`"
      >
        <div>{{ key }}</div>
        <div>{{ tpl(value, fromData) }}</div>
      </div>
    </template>
    <FormNotification
      v-else
      type="explanation"
      :message="`${translate('component.formResultsTable.noData')}`"
    />
  </div>
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useFormStore } from '@/store/useFormStore'

import { translate } from '@/i18n'

import FormNotification from '@/components/form/FormNotification/FormNotification.vue'

const tpl = function (template: string, props: Record<string, string>) {
  let result: string = template
  const regex = /\{([a-zA-Z]+)\}/g

  Array.from(template.matchAll(regex)).forEach(
    m => (result = result.replace('{' + m[1] + '}', (props[m[1]] ?? '') + ''))
  )

  return result
}

export default defineComponent({
  components: { FormNotification },
  props: {
    ...rendererProps<ControlElement>()
  },
  computed: {
    fields() {
      return Object.entries(this.appliedOptions.fields) as [string, string][]
    }
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
