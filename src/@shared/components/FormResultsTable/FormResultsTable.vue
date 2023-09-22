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
import type { FileType, FormData } from '@shared/types/form'

import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useForms } from '@shared/composables/form/useForms'
import { translate } from '@shared/i18n'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormRow from '@shared/components/FormRow/FormRow.vue'
import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'

export default defineComponent({
  components: { FormNotification, FormRow, DescriptionList },
  props: {
    ...rendererProps<ControlElement>()
  },
  data: () => {
    const { getAllProperties, formId } = useForms()
    return {
      getAllProperties,
      formId
    }
  },
  computed: {
    fields(): [string, string][] {
      return (Object.entries(this.appliedOptions.fields) as [string, string][]) ?? []
    },
    items(): DescriptionListItem[] {
      return this.fields
        .map(field => this.formatListItem(field))
        .filter(field => !!field) as DescriptionListItem[]
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
    formatListItem(item: [string, string]): DescriptionListItem | undefined {
      const [term, template] = item

      const result = this.replaceTemplateWithData(template, this.formData)

      if (!result) return undefined

      const { matches, text, field, files } = result

      if (files) {
        return {
          type: DescriptionListDetailsFieldType.FILE,
          field,
          term,
          files,
          formId: this.formId
        }
      }

      const type = this.getItemType(matches)
      return { term, type, text }
    },
    getItemType(keys: string[]): DescriptionListDetailsType {
      if (keys.length > 1) {
        // items consists of more than one field, print as string
        return DescriptionListDetailsFieldType.STRING
      }

      const properties = this.getAllProperties()
      const field = properties?.[keys[0]]

      const format = field?.file
        ? DescriptionListDetailsFieldType.FILE
        : (field?.format as DescriptionListDetailsType)

      const supportedFormats = Object.values(DescriptionListDetailsFieldType)
      const validFormat = supportedFormats.includes(format)
      return validFormat ? format : DescriptionListDetailsFieldType.STRING
    },
    replaceTemplateWithData(template: string, formData: FormData) {
      let matches: string[] = []
      let text: string = template
      const regex = /\{([a-zA-Z]+)\}/g
      const result = Array.from(template.matchAll(regex))

      let hasValue = false // Will become true if there is any data for this template. If there is no date, return undefined, so empty values will not be shown in the table

      while (result.length) {
        const match = result.shift()
        if (!match) break
        const field = match[1]
        matches.push(field)

        const target = formData[field]
        if (Array.isArray(target)) {
          // @TODO: for now we assume when there value is an array
          // it are files
          return {
            field,
            files: target as FileType[],
            matches
          }
        }
        if (!hasValue && formData[field]) hasValue = true
        text = text.replace(`{${field}}`, `${formData[field] ?? ''}`)
      }
      return !hasValue ? undefined : { matches, text }
    }
  },
  setup(props) {
    const { formData } = useForms()
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
