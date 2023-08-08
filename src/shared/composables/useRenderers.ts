import { vanillaRenderers } from '@jsonforms/vue-vanilla'

import { FormHtmlRenderer } from '@/shared/components/form/FormHtml/FormHtmlRenderer'
import { CustomControlRenderer } from '@/shared/components/form/FormCustomControl/FormCustomControlRenderer'
import { FormResultsTableRenderer } from '@/shared/components/form/FormResultsTable/FormResultsTableRenderer'
import { CustomGroupControlRenderer } from '@/shared/components/form/CustomGroupControl/CustomGroupControlRenderer'
import { FormNotificationRenderer } from '@/shared/components/form/FormNotification/FormNotificationRenderer.vue'

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
