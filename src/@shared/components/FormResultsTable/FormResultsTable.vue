<template>
  <div class="form-results-table">
    <FormRow v-bind="wrapperProps">
      <DescriptionList
        v-if="items.length"
        :items="items"
        :show-borders="showBorders"
      />
      <FormNotification
        v-else
        display-as="explanation"
        :message="t('component.formResultsTable.noData')"
      />
    </FormRow>
  </div>
</template>

<script lang="ts">
import type { ControlElement } from '@jsonforms/core'
import type { DescriptionListDetailsType, DescriptionListItem } from '@shared/types/details'
import type { FileType, FormData } from '@shared/types/form'
import { DescriptionListDetailsFieldType } from '@shared/types/details'
import { ProjectType } from '@shared/types/project'

import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useForms } from '@shared/composables/form/useForms'

import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import FormRow from '@shared/components/FormRow/FormRow.vue'

const isPortal = import.meta.env.VITE_PROJECT === ProjectType.PORTAL

export default defineComponent({
  components: { FormNotification, FormRow, DescriptionList },
  props: {
    ...rendererProps<ControlElement>()
  },
  data: () => {
    const { getAllProperties, formId, activeForm, index } = useForms()
    const form = activeForm.value?.forms[index.value]
    const applicationId = form.metadata?.application?.id
    const stageId = form.metadata?.applicationStage?.id

    return {
      getAllProperties,
      applicationId,
      formId,
      stageId
    }
  },
  computed: {
    showEmptyFields(): boolean {
      return !!this.appliedOptions.showEmptyFields || false
    },
    showBorders(): boolean {
      return this.appliedOptions.showBorders !== false;
    },
    fields(): [string, string][] {
      return (Object.entries(this.appliedOptions.fields) as [string, string][]) ?? []
    },
    items(): DescriptionListItem[] {
      return this.fields
        .map((field) => this.formatListItem(field))
        .filter((field) => !!field) as DescriptionListItem[]
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

      if (!result) {
        return undefined
      }

      const { text, field, files, type } = result
      const formId = isPortal ? `${this.formId}` : `${this.applicationId}/stages/${this.stageId}`

      if (type === DescriptionListDetailsFieldType.FILE) {
        return {
          type,
          field,
          term,
          files,
          formId
        }
      }

      return { term, type, text }
    },
    getItemTypeForKeys(keys: string[]): DescriptionListDetailsType {
      if (keys.length > 1) {
        // items consists of more than one field, print as string
        return DescriptionListDetailsFieldType.STRING
      }

      return this.getItemType(keys[0])
    },
    getItemType(fieldName: string): DescriptionListDetailsType {
      const properties = this.getAllProperties()
      const field = properties?.[fieldName]

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
      const result = [...template.matchAll(regex)]

      // Will become true if there is any data for this template,
      // Or if the showEmptyFields option is set to true
      // If there is no date, return undefined, so empty values
      // will not be shown in the table
      let showField = this.showEmptyFields

      while (result.length > 0) {
        const match = result.shift()
        if (!match) break
        const field = match[1]
        matches.push(field)

        let fieldValue = formData[field]
        const fieldValueIsArray = Array.isArray(fieldValue)

        if (fieldValueIsArray) {
          const type = this.getItemType(field)
          if (type === DescriptionListDetailsFieldType.FILE) {
            return {
              field,
              files: fieldValue as FileType[],
              matches,
              type
            }
          }

          fieldValue = (fieldValue as string[]).join(', ')
        }

        if (fieldValue !== undefined) {
          showField = true
        }

        text = text.replace(`{${field}}`, `${fieldValue ?? ''}`)
      }

      const type = this.getItemTypeForKeys(matches)

      return showField ? { matches, text, type } : undefined
    }
  },
  setup(props) {
    const { formData } = useForms()
    const jsonFormsControl = useJsonFormsControl(props)
    const vanillaControl = useVanillaControl(jsonFormsControl)
    const { t } = useI18n()

    return {
      ...vanillaControl,
      formData,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.form-results-table-row {
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
</style>
