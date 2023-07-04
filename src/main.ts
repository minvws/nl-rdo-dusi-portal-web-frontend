import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { i18n } from './i18n'
import router from './router'

import AppShell from '@/components/AppShell/AppShell.vue'

import '@/styles/main.scss'

const app = createApp(AppShell)

app.use(createPinia())

i18n().then(i18n => {
  app.use(i18n)
  app.use(router)
  app.use(createHead())
  app.mount('body')
})
