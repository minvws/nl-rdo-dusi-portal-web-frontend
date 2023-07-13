import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { rankWith } from '@jsonforms/core'
import FormResultsTable from './FormResultsTable.vue'

export const FormResultsTableRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormResultsTable,
  tester: rankWith(1, ({ type }) => {
    return type === 'FormResultsTable'
  })
}
