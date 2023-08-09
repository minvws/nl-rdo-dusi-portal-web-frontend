import { vanillaRenderers } from '@jsonforms/vue-vanilla'

import { CustomControlRenderer } from '@shared/components/FormCustomControl/FormCustomControlRenderer'
import { FormGroupControlRenderer } from '@shared/components/FormGroupControl/FormGroupControlRenderer'
import { FormHtmlRenderer } from '@shared/components/FormHtml/FormHtmlRenderer'
import { FormNotificationRenderer } from '@shared/components/FormNotification/FormNotificationRenderer'
import { FormResultsTableRenderer } from '@shared/components/FormResultsTable/FormResultsTableRenderer'

export const useRenderers = () => {
  const renderers = [
    ...vanillaRenderers,
    CustomControlRenderer,
    FormGroupControlRenderer,
    FormHtmlRenderer,
    FormNotificationRenderer,
    FormResultsTableRenderer
  ]
  return Object.freeze(renderers)
}
