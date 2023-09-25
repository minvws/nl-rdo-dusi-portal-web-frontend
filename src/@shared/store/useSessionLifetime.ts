import type { Ref } from 'vue'
import type { Session } from '@shared/types/session'

import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { translate } from '@shared/i18n'

import { useAppModal } from '@shared/store/useAppModal'
import { useAuthStore } from '@portal/store/useAuthStore'
import { useApiLoginUrl } from '@portal/composables/useApiUrl'

import { ModalType } from '@shared/types/modal'
import { SessionType } from '@shared/types/session'

import { openExternalLink } from '@shared/utils/link'

const UPDATE_INTERVAL_IN_MILLISECONDS = 1000
const EXTEND_SESSION_FRACTION = 1 / 15 // fraction of the total duration when the user is prompt to extend its session

export const useSessionLifetime = defineStore('useSessionLifetime', () => {
  const authStore = useAuthStore()
  const { openModal, closeModal } = useAppModal()

  const duration: Ref<number | undefined> = ref(undefined)
  const elapsedTime: Ref<number> = ref(0)
  const lastTime: Ref<number> = ref(0)

  let interval: NodeJS.Timeout | undefined = undefined

  const setSessionLifetime = (miliseconds?: number) => {
    duration.value = miliseconds
    elapsedTime.value = 0
  }

  const stopInterval = () => {
    clearInterval(interval)
  }

  const timeLeft = computed(() => {
    return duration.value ? duration.value - elapsedTime.value : 0
  })

  const aboutToExpire = computed(() => (duration.value ?? 0) * EXTEND_SESSION_FRACTION)

  const session: Ref<Session> = computed(() => {
    if (!timeLeft.value || !duration.value) {
      return SessionType.INVALID
    } else if (timeLeft.value < 0) {
      return SessionType.EXPIRED
    } else if (timeLeft.value < aboutToExpire.value) {
      return SessionType.EXPIRING
    } else {
      return SessionType.VALID
    }
  })

  const getModalButtons = (session: Session) => {
    return [
      {
        label: translate(`authentication.modal.${session}.buttonLabel`) ?? '',
        action: () => {
          switch (session) {
            case SessionType.EXPIRING:
              // extend session
              authStore.logIn(true)
              break
            case SessionType.EXPIRED:
              // login
              openExternalLink(useApiLoginUrl())
              break
          }
        }
      }
    ]
  }

  const getModal = (session: Session) => {
    const title = translate(`authentication.modal.${session}.title`) ?? ''
    const message = translate(`authentication.modal.${session}.message`) ?? ''
    return {
      type: ModalType.WARNING,
      title,
      message,
      buttons: getModalButtons(session)
    }
  }

  watch(duration, duration => {
    stopInterval()
    if (!duration) return

    elapsedTime.value = 0
    lastTime.value = Date.now()

    interval = setInterval(() => {
      const currentTime = Date.now()
      elapsedTime.value += currentTime - lastTime.value
      lastTime.value = currentTime
    }, UPDATE_INTERVAL_IN_MILLISECONDS)
  })

  watch(
    session,
    session => {
      switch (session) {
        case SessionType.EXPIRING:
        case SessionType.EXPIRED:
          openModal(getModal(session))
          break
        default:
          closeModal()
      }
    },
    { immediate: true }
  )

  return {
    setSessionLifetime
  }
})
