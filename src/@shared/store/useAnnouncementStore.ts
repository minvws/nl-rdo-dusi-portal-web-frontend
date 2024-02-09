import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnnouncementStore = defineStore('useAnnouncementStore', () => {
  const message = ref<string>('')
  const politeness = ref<'polite' | 'assertive'>('polite')

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
