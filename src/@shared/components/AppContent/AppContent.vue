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
import { ref } from 'vue'
import { useRouter, START_LOCATION } from 'vue-router'

import { translate } from '@shared/i18n'
import { useAnnounce } from '@shared/composables/useAnnounce'

const router = useRouter()
const announce = useAnnounce()
const main = ref()

const trimTitle = (title: string) => (title || '').replace(' | ' + translate('app.prefix'), '')

const announcePageTitle = () => {
  const title = trimTitle(document.title || translate('announcement.page') || '')
  const message = `${title} ${translate('announcement.loaded')}`
  announce(message, 'assertive')
}

router.afterEach((to, from) => {
  if (from === START_LOCATION) return
  if (to.path === from.path) return
  if (from.name === 'login-callback') return
  setTimeout(() => {
    main?.value?.focus()
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      announcePageTitle()
    })
  }, 300)
})
</script>

<style lang="scss" scoped>
#main-content {
  // @TODO: give the main content some minimal-height
  min-height: 70vh;
}
</style>
