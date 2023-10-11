import { useAnnouncementStore } from '@shared/store/useAnnouncementStore'

export const useAnnounce = () => {
  const store = useAnnouncementStore()
  const announce = (message: string, politeness?: 'polite' | 'assertive') => {
    store.message = message
    store.politeness = politeness || 'polite'
  }
  return announce
}
