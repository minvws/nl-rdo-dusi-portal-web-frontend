<template>
  <div class="form-results-table">
    <FormRow v-bind="wrapperProps">
      <DescriptionList
        v-if="items.length"
        :items="items"
      />
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
import type { DescriptionListDetailsType, DescriptionListItem } from '@shared/types/details'

import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useFormStore } from '@shared/store/useFormStore'
import { translate } from '@shared/i18n'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormRow from '@shared/components/FormRow/FormRow.vue'
import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'

export default defineComponent({
  components: { FormNotification, FormRow, DescriptionList },
  props: {
    ...rendererProps<ControlElement>()
  },
  computed: {
    fields(): [string, string][] {
      return (Object.entries(this.appliedOptions.fields) as [string, string][]) ?? []
    },
    items(): DescriptionListItem[] {
      return this.fields.map(field => this.formatListItem(field))
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
    formatListItem(field: [string, string]): DescriptionListItem {
      const [term, template] = field
      const key = template.slice(1, -1)
      const text = this.formData[key] ? this.formData[key].toString() : ''
      const type = this.getItemType(key)

      return { term, type, text }
    },
    getItemType(key: string): DescriptionListDetailsType {
      const properties = this.schema?.properties || {}
      const supportedFormats = ['string', 'date', 'url', 'file'] as DescriptionListDetailsType[]
      const format = properties[key].format as DescriptionListDetailsType
      const validFormat = supportedFormats.includes(format)

      return validFormat ? format : 'string'
    }
  },
  setup(props) {
    const formStore = useFormStore()
    const { formData } = storeToRefs(formStore)
    const jsonFormsControl = useJsonFormsControl(props)
    const vanillaControl = useVanillaControl(jsonFormsControl)

    return {
      ...vanillaControl,
      formData,
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
