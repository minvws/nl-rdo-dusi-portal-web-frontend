import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnnouncementStore = defineStore('useAnnouncementStore', () => ({
  message: ref<string>(''),
  politeness: ref<'polite' | 'assertive'>('polite')
}))
