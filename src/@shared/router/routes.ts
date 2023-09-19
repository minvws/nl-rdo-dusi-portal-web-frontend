import AccessibilityStatementPage from '@shared/pages/AccessibilityStatementPage.vue'
import PrivacyStatementPage from '@shared/pages/PrivacyStatementPage.vue'

import { ACCESSIBILITY_STATEMENT, NOT_FOUND, PRIVACY_STATEMENT } from '@shared/router/names'

export const sharedRoutes = [
  {
    path: '/toegankelijkheidsverklaring',
    name: ACCESSIBILITY_STATEMENT,
    component: AccessibilityStatementPage
  },
  {
    path: '/privacyverklaring',
    name: PRIVACY_STATEMENT,
    component: PrivacyStatementPage
  },
  {
    path: '/:catchAll(.*)',
    name: NOT_FOUND,
    props: true
  }
]
