import type { Ref } from 'vue'
import type { TwoFactorResponse } from '@shared/types/api-response'
import type { User } from '@shared/types/user'
import type { UserRoleType } from '@shared/types/user'
import { type NotificationDisplayType, NotificationType } from '@/@shared/types/notification'

import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { translate } from '@shared/i18n'

import {
  useApiLoginUrl,
  useApiLogoutUrl,
  useApiPasswordUpdateUrl,
  useApiTwoFactorChallengeUrl,
  useApiUserStatusUrl
} from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { removeSessionCookie, setSessionCookie } from '@shared/utils/session-cookie'
import { log } from '@shared/utils/logger'

import { HOME, LOGIN_VIEW, TWO_FACTOR_VIEW } from '@assessment/router/names'
import { fromCamelCaseToSnakeCase } from '@/@shared/utils/format'

const useCredentials = !import.meta.env.PROD

export const useAuthStore = defineStore('useAuthStore', () => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()

  const user: Ref<User | null> = ref(null)

  const isLoggedIn: Ref<boolean> = ref(false)
  const needsTwoFactor: Ref<boolean> = ref(false)

  const userRoles = computed(() => user.value?.roles ?? [])
  const isPasswordExpired = computed(() => user.value?.passwordExpired)

  function checkUserRights(roleTypes: UserRoleType[]) {
    return userRoles.value.some(role => roleTypes.includes(role.name))
  }

  async function getUserInfo() {
    try {
      const url = useApiUserStatusUrl()
      const options: RequestInit = { method: 'GET', credentials: 'include' }
      const response = await fetch(url, options)
      const json = await response.json()

      if (!response.ok) {
        user.value = null
        isLoggedIn.value = false

        removeSessionCookie()
      } else {
        user.value = json.data
        isLoggedIn.value = true

        setSessionCookie()
      }
    } catch (error) {
      log('Error getting user info', error)
    }
  }

  async function logOut() {
    try {
      const url = useApiLogoutUrl()
      const options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, options)

      if (response.ok) {
        user.value = null
        isLoggedIn.value = false
      }
    } catch (error) {
      log('Error trying to log out', error)
    }
  }

  async function logIn(credentials: { email: string; password: string }) {
    try {
      const url = useApiLoginUrl()
      const options: RequestInit = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        ...(useCredentials && { credentials: 'include' }),
        body: JSON.stringify(credentials)
      }
      const response = await fetch(url, options)
      const json = await response.json()

      if (!response.ok) {
        switch (response.status) {
          case 422:
            return setNotification('login-invalid-credentials', NotificationType.ERROR)
          case 429:
            return setNotification('login-too-many-attempts', NotificationType.ERROR)
          default:
            return setNotification('login-failed', NotificationType.ERROR)
        }
      }

      if (json) {
        const { two_factor } = json
        determineTwoFactorRoute({ two_factor })
      }
    } catch (error) {
      log('Error trying to log in', error)
    }
  }

  async function twoFactorChallenge(code: string) {
    try {
      const url = useApiTwoFactorChallengeUrl()
      const options: RequestInit = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ code })
      }
      const response = await fetch(url, options)

      if (!response.ok) {
        switch (response.status) {
          case 422:
            return setNotification('2fa-invalid-code', NotificationType.ERROR)
          default:
            return setNotification('2fa-failed', NotificationType.ERROR)
        }
      }

      if (response.status === 204) {
        router.push({ name: HOME })
      }
    } catch (error) {
      log('Error trying to use two-factor auth', error)
    }
  }

  async function updatePassword(payload: {
    currentPassword?: string
    password: string
    passwordConfirmation: string
  }) {
    try {
      const url = useApiPasswordUpdateUrl()
      const data = Object.entries(payload).reduce(
        (cul, [key, value]) => {
          if (value) return { ...cul, [fromCamelCaseToSnakeCase(key)]: value }
          return cul
        },
        {} as Record<string, string>
      )

      const options: RequestInit = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        ...(useCredentials && { credentials: 'include' }),
        body: JSON.stringify(data)
      }
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(response?.statusText)
      }

      setNotification('password-update-success', NotificationType.CONFIRMATION)
      router.push({ name: HOME })
    } catch (e) {
      const error = e as Error
      log('Error trying to update password', error)
      setNotification('password-update-failed', NotificationType.ERROR, { error: error?.message })
    }
  }

  function onLoginChange(isLoggedIn: boolean) {
    if (!isLoggedIn) {
      removeSessionCookie()
      router.push({ name: LOGIN_VIEW })
    }
  }

  function setNotification(
    id: string,
    type: NotificationDisplayType,
    props?: Record<string, string>
  ) {
    notificationsStore.add({
      id: 'login-message',
      displayAs: type,
      label: translate(`authentication.${id}.label`, props) ?? '',
      message: translate(`authentication.${id}.message`, props) ?? '',
      pageChangeCount: type === NotificationType.CONFIRMATION ? 2 : 1
    })
  }

  function determineTwoFactorRoute({ two_factor }: TwoFactorResponse) {
    if (two_factor) {
      needsTwoFactor.value = true
      router.push({ name: TWO_FACTOR_VIEW })
    } else {
      needsTwoFactor.value = false
      router.push({ name: HOME })
    }
  }

  watch(isLoggedIn, isLoggedIn => onLoginChange(isLoggedIn))

  return {
    getUserInfo,
    isLoggedIn,
    isPasswordExpired,
    needsTwoFactor,
    logIn,
    logOut,
    twoFactorChallenge,
    updatePassword,
    checkUserRights
  }
})
