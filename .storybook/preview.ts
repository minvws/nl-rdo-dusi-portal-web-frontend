import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import router from '@shared/router'
import { i18n } from '@shared/i18n'

import '@shared/styles/main.scss'

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

Promise.all([i18n(), router()]).then(([i18n, router]) => {
  setup((app) => {
    app.use(createPinia())
    app.use(router)
    app.use(i18n)
  })
})
