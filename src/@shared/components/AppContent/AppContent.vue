<template>
  <main
    id="main-content"
    ref="main"
    tabindex="-1"
  >
    <slot />
  </main>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter, START_LOCATION } from 'vue-router'

import { translate } from '@shared/i18n'
import { useAnnouncementStore } from '@shared/store/useAnnouncementStore'

import { LOGIN_CALLBACK_VIEW } from '@portal/router/names'

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

  setTimeout(() => {
    focusMain()

    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      announcePageTitle()
    })
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
  const title = trimTitle(document.title || translate('announcement.page') || '')
  const message = `${title} ${translate('announcement.loaded')}`
  announcementStore.announce(message, 'assertive')
}

function trimTitle(title: string) {
  return (title || '').replace(' | ' + translate('app.prefix'), '')
}
</script>

<style lang="scss" scoped>
#main-content {
  // @TODO: give the main content some minimal-height
  min-height: 70vh;
}
</style>
