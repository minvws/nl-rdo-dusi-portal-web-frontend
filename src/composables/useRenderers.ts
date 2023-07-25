import { vanillaRenderers } from '@jsonforms/vue-vanilla'

import { FormHtmlRenderer } from '@/components/form/FormHtml/FormHtmlRenderer'
import { CustomControlRenderer } from '@/components/form/FormCustomControl/FormCustomControlRenderer'
import { FormResultsTableRenderer } from '@/components/form/FormResultsTable/FormResultsTableRenderer'
import { CustomGroupControlRenderer } from '@/components/form/CustomGroupControl/CustomGroupControlRenderer'
import { FormNotificationRenderer } from '@/components/form/FormNotification/FormNotificationRenderer.vue'

export const useRenderers = () => {
  const renderers = [
    ...vanillaRenderers,
    FormHtmlRenderer,
    FormResultsTableRenderer,
    CustomControlRenderer,
    CustomGroupControlRenderer,
    FormNotificationRenderer
  ]
  return Object.freeze(renderers)
}
