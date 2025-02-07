<template>
  <main
    id="main-content"
    ref="main"
    tabindex="-1"
  >
    <slot />
  </main>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref } from 'vue'
import { useRouter, START_LOCATION } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useAnnouncementStore } from '@shared/store/useAnnouncementStore'

import { LOGIN_CALLBACK_VIEW } from '@portal/router/names'

const { t } = useI18n()
const router = useRouter()
const announcementStore = useAnnouncementStore()

const main: Ref = ref()

router.afterEach((to, from) => {
  const isStartLocation = from === START_LOCATION
  const isSamePage = to.path === from.path
  const isLoginCallbackView = from.name === LOGIN_CALLBACK_VIEW

  if (isStartLocation || isSamePage || isLoginCallbackView) {
    return
  }

  requestAnimationFrame(() => {
    focusMain()
    window.scrollTo(0, 0)
  })

  setTimeout(() => {
    announcePageTitle()
  }, 300)
})

function focusMain() {
  if (!main.value) {
    return
  }
  // don't move focus if focus is already on an element inside main
  if (main.value.contains(document.activeElement)) {
    return
  }
  // if there's an element with the autofocus attribute, move focus there
  const autofocus = main.value.querySelector('[autofocus]')
  if (autofocus) {
    autofocus.focus()
    return
  }
  main.value.focus()
}

function announcePageTitle() {
  const title = trimTitle(document.title || t('announcement.page'))
  const message = `${title} ${t('announcement.loaded')}`
  announcementStore.announce(message, 'assertive')
}

function trimTitle(title: string) {
  return (title || '').replace(' | ' + t('app.prefix'), '')
}
</script>

<style lang="scss" scoped>
#main-content {
  min-height: 70vh;
}
</style>
