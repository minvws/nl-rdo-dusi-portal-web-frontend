import { vanillaRenderers } from '@jsonforms/vue-vanilla'

import { CustomControlRenderer } from '@shared/components/FormCustomControl/FormCustomControlRenderer'
import { FormGroupControlRenderer } from '@shared/components/FormGroupControl/FormGroupControlRenderer'
import { FormHtmlRenderer } from '@shared/components/FormHtml/FormHtmlRenderer'
import { FormNotificationRenderer } from '@shared/components/FormNotification/FormNotificationRenderer'
import { FormResultsTableRenderer } from '@shared/components/FormResultsTable/FormResultsTableRenderer'
import { FormTransitionHistoryRenderer } from '@shared/components/FormTransitionHistory/FormTransitionHistoryRenderer'

export const useRenderers = () => {
  const renderers = [
    ...vanillaRenderers,
    CustomControlRenderer,
    FormResultsTableRenderer,
    FormGroupControlRenderer,
    FormHtmlRenderer,
    FormNotificationRenderer,
    FormTransitionHistoryRenderer
  ]
  return Object.freeze(renderers)
}
