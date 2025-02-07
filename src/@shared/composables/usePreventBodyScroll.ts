import type { Ref } from 'vue'

import { watch } from 'vue'

export const usePreventBodyScroll = (isEnabled: Ref<boolean>) => {
  watch(
    isEnabled,
    (isEnabled) => {
      const overflow = isEnabled ? 'hidden' : 'auto'
      document.body.style.overflow = overflow
    },
    { immediate: true }
  )
}
