<template>
  <div class="form-results-table">
    <FormRow v-bind="wrapperProps">
      <template v-if="items.length">
        <div
          v-for="([key, value], index) in items"
          class="form-results-table-row"
          :key="`row-${index}`"
        >
          <div>{{ key }}</div>
          <div>
            <strong v-html="value" />
          </div>
        </div>
      </template>
      <FormNotification
        v-else
        displayAs="explanation"
        :message="`${translate('component.formResultsTable.noData')}`"
      />
    </FormRow>
  </div>
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'
import type { FormData } from '@shared/types/form'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useFormStore } from '@shared/store/useFormStore'
import { translate } from '@shared/i18n'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormRow from '@shared/components/FormRow/FormRow.vue'
import { storeToRefs } from 'pinia'

const tpl = function (template: string, props: FormData) {
  let result: string = template
  const regex = /\{([a-zA-Z]+)\}/g
  Array.from(template.matchAll(regex)).forEach(
    m => (result = result.replace('{' + m[1] + '}', (props[m[1]] ?? '') + ''))
  )

  return result
}

export default defineComponent({
  components: { FormNotification, FormRow },
  props: {
    ...rendererProps<ControlElement>()
  },
  computed: {
    fields() {
      return (Object.entries(this.appliedOptions.fields) as [string, string][]) ?? []
    },
    items() {
      return this.fields.map(([key, value]) => {
        return [key, tpl(value, this.fromData)]
      })
    },
    wrapperProps() {
      const { styles, appliedOptions, control } = this
      const { id, label, visible } = control

      return {
        appliedOptions,
        id: id ?? 'formResultsTable',
        label,
        styles,
        visible,
        hideRequiredLabel: true
      }
    }
  },
  methods: {
    tpl
  },
  setup(props) {
    const { formData } = storeToRefs(useFormStore())
    return {
      ...useVanillaControl(useJsonFormsControl(props)),
      fromData: formData,
      translate
    }
  }
})
</script>

<style lang="scss" scoped>
.form-results-table {
  &-row {
    display: flex;
    flex-direction: row;
    background-color: var(--grey-1);

    &:nth-child(odd) {
      background-color: white;
    }

    div {
      padding: 0.5rem 1rem;
    }
  }
}
</style>
