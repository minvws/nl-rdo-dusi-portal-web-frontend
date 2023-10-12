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

const trimTitle = (title: string) => (title || '').replace(' | ' + translate('app.prefix'), '')

router.afterEach((to, from) => {
  const isStartLocation = from === START_LOCATION
  const isSamePage = to.path === from.path
  const isLoginCallbackView = from.name === LOGIN_CALLBACK_VIEW

  if (isStartLocation || isSamePage || isLoginCallbackView) {
    return
  }

  announcePageTitle()
})

function announcePageTitle() {
  const title = trimTitle(document.title || translate('announcement.page') || '')
  const message = `${title} ${translate('announcement.loaded')}`

  setTimeout(() => {
    main?.value?.focus()

    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      announcementStore.announce(message, 'assertive')
    })
  }, 300)
}
</script>

<style lang="scss" scoped>
#main-content {
  // @TODO: give the main content some minimal-height
  min-height: 70vh;
}
</style>
