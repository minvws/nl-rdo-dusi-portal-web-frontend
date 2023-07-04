import { vanillaRenderers } from '@jsonforms/vue-vanilla'

import { FormHtmlRenderer } from '@/components/form/FormHtml.vue'
import { CustomControlRenderer } from '@/components/form/FormCustomControl/FormCustomControl.vue'
import { FormResultsTableRenderer } from '@/components/form/FormResultsTable/FormResultsTable.vue'
import { CustomGroupControlRenderer } from '@/components/form/CustomGroupControl/CustomGroupControl.vue'

export const useRenderers = () => {
  const renderers = [
    ...vanillaRenderers,
    FormHtmlRenderer,
    FormResultsTableRenderer,
    CustomControlRenderer,
    CustomGroupControlRenderer
  ]
  return Object.freeze(renderers)
}
