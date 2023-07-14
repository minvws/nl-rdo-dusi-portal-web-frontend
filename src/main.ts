import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { i18n } from './i18n'
import router from './router'

import AppShell from '@/components/AppShell/AppShell.vue'

import '@/styles/main.scss'

const app = createApp(AppShell)
const head = createHead()
const pinia = createPinia()

i18n().then(i18n => {
  app.use(pinia)
  app.use(router)
  app.use(head)
  app.use(i18n)
  app.mount('body')
})
