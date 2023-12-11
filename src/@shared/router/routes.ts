import AccessibilityStatementPage from '@shared/pages/AccessibilityStatementPage.vue'
import NotFoundPage from '@shared/pages/NotFound.vue'
import PrivacyStatementPage from '@shared/pages/PrivacyStatementPage.vue'

import { ACCESSIBILITY_STATEMENT, NOT_FOUND, PRIVACY_STATEMENT } from '@shared/router/names'

export const sharedRoutes = [
  {
    path: '/toegankelijkheidsverklaring',
    name: ACCESSIBILITY_STATEMENT,
    component: AccessibilityStatementPage,
    meta: {
      public: true
    }
  },
  {
    path: '/privacyverklaring',
    name: PRIVACY_STATEMENT,
    component: PrivacyStatementPage,
    meta: {
      public: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: NOT_FOUND,
    component: NotFoundPage,
    meta: {
      public: true
    }
  }
]
