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
import {
  DescriptionListDetailsFieldType,
  type DescriptionListDetailsType,
  type DescriptionListItem
} from '@shared/types/details'
import type { FormData } from '@shared/types/form'
import type { FieldProp } from '@/@shared/types/field'

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
      const { matches, text } = this.replaceTemplateWithData(template, this.formData)
      const type = this.getItemType(matches)

      return { term, type, text }
    },
    getItemType(keys: string[]): DescriptionListDetailsType {
      const supportedFormats = Object.values(DescriptionListDetailsFieldType)
      const properties = this.schema?.properties || {}

      if (keys.length > 1) {
        return DescriptionListDetailsFieldType.STRING
      }

      const key = keys[0]
      const field = properties[key] as FieldProp

      const format = field?.file
        ? DescriptionListDetailsFieldType.FILE
        : (field?.format as DescriptionListDetailsType)

      const validFormat = supportedFormats.includes(format)
      return validFormat ? format : DescriptionListDetailsFieldType.STRING
    },
    replaceTemplateWithData(template: string, formData: FormData) {
      let matches: string[] = []
      let text: string = template
      const regex = /\{([a-zA-Z]+)\}/g

      Array.from(template.matchAll(regex)).forEach(match => {
        matches.push(match[1])
        text = text.replace('{' + match[1] + '}', (formData[match[1]] ?? '') + '')
      })

      return { matches, text }
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
