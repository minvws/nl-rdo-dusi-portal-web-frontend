import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { i18n } from '@shared/i18n'
import createRouter from '@shared/router'
import AppShell from '@shared/components/AppShell/AppShell.vue'
import '@shared/styles/main.scss'

const app = createApp(AppShell)
const head = createHead()
const pinia = createPinia()

i18n().then(async (i18n) => {
  app.use(pinia)
  app.use(await createRouter())
  app.use(head)
  app.use(i18n)
  app.mount('body')
})
