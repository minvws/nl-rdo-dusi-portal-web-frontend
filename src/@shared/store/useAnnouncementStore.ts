import type { Ref } from 'vue'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnnouncementStore = defineStore('useAnnouncementStore', () => {
  const message: Ref<string> = ref('')
  const politeness: Ref<'polite' | 'assertive'> = ref('polite')

  function announce(text: string, level?: 'polite' | 'assertive') {
    message.value = text
    politeness.value = level || 'polite'
  }

  return {
    announce,
    message,
    politeness
  }
})
