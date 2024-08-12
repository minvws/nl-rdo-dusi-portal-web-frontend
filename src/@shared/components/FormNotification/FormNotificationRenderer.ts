import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'

import { rankWith, uiTypeIs } from '@jsonforms/core'
import FormNotificationRendererComponent
  from '@shared/components/FormNotification/FormNotificationRendererComponent.vue'

export const FormNotificationRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormNotificationRendererComponent,
  tester: rankWith(1, uiTypeIs('FormNotification'))
}
