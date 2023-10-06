<template>
  <main
    id="main-content"
    ref="content"
    tabindex="-1"
  >
    <slot />
  </main>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalized } from 'vue-router'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const initialRoute = ref(true)

const content = ref()

const onFocusMainElement = () => {
  content?.value?.focus()
}

router.afterEach(
  ({ path: toPath }: RouteLocationNormalized, { path: fromPath }: RouteLocationNormalized) => {
    if (initialRoute.value) {
      initialRoute.value = false
      return
    }
    if (toPath === fromPath) return
    onFocusMainElement()
  }
)
</script>

<style lang="scss" scoped>
#main-content {
  // @TODO: give the main content some minimal-height
  min-height: 70vh;
}
</style>
