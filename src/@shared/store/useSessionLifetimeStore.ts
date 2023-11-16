import type { Ref } from 'vue'
import type { Session } from '@shared/types/session'

import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { translate } from '@shared/i18n'

import { useAppModalStore } from '@shared/store/useAppModalStore'
import { ModalType } from '@shared/types/modal'
import { SessionType } from '@shared/types/session'

import {
  getSessionCookie,
  removeSessionCookie,
  setSessionCookie
} from '@shared/utils/session-cookie'
import { useDispatcher } from '@shared/store/useDispatcher'

const UPDATE_INTERVAL_IN_MILLISECONDS = 1000
const EXTEND_SESSION_FRACTION = 1 / 15 // fraction of the total duration when the user is prompt to extend its session

export const useSessionLifetimeStore = defineStore('useSessionLifetimeStore', () => {
  const { dispatch } = useDispatcher()
  const { openModal, closeModal } = useAppModalStore()

  const init: Ref<boolean> = ref(false)
  const duration: Ref<number | undefined> = ref(undefined)
  const elapsedTime: Ref<number> = ref(0)
  const lastTime: Ref<number> = ref(0)

  let interval: NodeJS.Timeout | undefined = undefined

  const timeLeft = computed(() => (duration.value ? duration.value - elapsedTime.value : 0))

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

  function getModalButtons(session: Session) {
    return [
      {
        label: translate(`authentication.modal.${session}.buttonLabel`) ?? '',
        action: () => dispatch(session)
      }
    ]
  }

  function getModal(session: Session) {
    const title = translate(`authentication.modal.${session}.title`) ?? ''
    const message = translate(`authentication.modal.${session}.message`) ?? ''

    return {
      type: ModalType.WARNING,
      title,
      message,
      buttons: getModalButtons(session)
    }
  }

  function setSessionLifetime(miliseconds?: number) {
    duration.value = miliseconds
    elapsedTime.value = 0
  }

  function stopInterval() {
    clearInterval(interval)
  }

  function extendSession() {
    const duration = setSessionCookie()
    setSessionLifetime(duration)
  }

  function removeSession() {
    removeSessionCookie()
    setSessionLifetime(undefined)
  }

  function restoreSession() {
    if (init.value) return
    init.value = true
    return getSessionCookie()
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
    restoreSession,
    extendSession,
    removeSession
  }
})
