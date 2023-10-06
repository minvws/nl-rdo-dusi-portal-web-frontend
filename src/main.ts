import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import VueAnnouncer from '@vue-a11y/announcer'
import { i18n, translate } from '@shared/i18n'
import createRouter from '@shared/router'
import AppShell from '@shared/components/AppShell/AppShell.vue'
import '@shared/styles/main.scss'

const app = createApp(AppShell)
const head = createHead()
const pinia = createPinia()

i18n().then(async i18n => {
  const router = await createRouter()
  app.use(pinia)
  app.use(VueAnnouncer, { router, routeComplement: translate('app.route-loaded') })
  app.use(router)
  app.use(head)
  app.use(i18n)
  app.mount('body')
})
