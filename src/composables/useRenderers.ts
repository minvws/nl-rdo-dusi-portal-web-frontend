import { vanillaRenderers } from '@jsonforms/vue-vanilla'

import { FormHtmlRenderer } from '@/components/form/FormHtml/FormHtmlRenderer'
import { CustomControlRenderer } from '@/components/form/FormCustomControl/FormCustomControlRenderer'
import { FormResultsTableRenderer } from '@/components/form/FormResultsTable/FormResultsTableRenderer'
import { CustomGroupControlRenderer } from '@/components/form/CustomGroupControl/CustomGroupControlRenderer'

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
