import type { Ref } from 'vue'
import type { TwoFactorResponse } from '@shared/types/api-response'
import type { User } from '@shared/types/user'
import type { UserRoleType } from '@shared/types/user'
import { type NotificationDisplayType, NotificationType } from '@shared/types/notification'

import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { translate } from '@shared/i18n'

import {
  useApiForgotPasswordUrl,
  useApiLoginUrl,
  useApiLogoutUrl,
  useApiPasswordResetUrl,
  useApiPasswordUpdateUrl,
  useApiTwoFactorChallengeUrl,
  useApiUserStatusUrl,
  useCsrfCookieUrl
} from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useSessionLifetimeStore } from '@shared/store/useSessionLifetimeStore'
import { useDispatcher } from '@shared/store/useDispatcher'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { JSONRequestHeaders } from '@shared/composables/useFetchHeaders'

import { log } from '@shared/utils/logger'

import { HOME, LOGIN_VIEW, TWO_FACTOR_VIEW } from '@assessment/router/names'
import { formatPayloadFromCamelCaseToSnakeCase } from '@shared/utils/format'
import { SessionType } from '@shared/types/session'

export const useAuthStore = defineStore('useAuthStore', () => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const sessionLifetimeStore = useSessionLifetimeStore()
  const { on } = useDispatcher()

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
      const options: RequestInit = {
        method: 'GET',
        ...JSONRequestHeaders
      }
      const { data, response } = await useFetchWithCredentials(url, options).json()

      if (!response.value?.ok) {
        user.value = null
        isLoggedIn.value = false
        sessionLifetimeStore.removeSession()
      } else {
        user.value = data.value
        isLoggedIn.value = true
        sessionLifetimeStore.extendSession()
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
        ...JSONRequestHeaders
      }
      const { response } = await useFetchWithCredentials(url, options).json()

      if (response.value?.ok) {
        user.value = null
        isLoggedIn.value = false
      }
    } catch (error) {
      log('Error trying to log out', error)
    }
  }

  async function logIn(credentials: { email: string; password: string }) {
    try {
      await getCsrfCookie()

      const url = useApiLoginUrl()
      const options: RequestInit = {
        method: 'POST',
        ...JSONRequestHeaders,
        body: JSON.stringify(credentials)
      }
      const { data, response } = await useFetchWithCredentials(url, options).json()

      if (!response.value?.ok) {
        switch (response.value?.status) {
          case 422:
            return setNotification('login-invalid-credentials', NotificationType.ERROR)
          case 429:
            return setNotification('login-too-many-attempts', NotificationType.ERROR)
          default:
            return setNotification('login-failed', NotificationType.ERROR)
        }
      }

      if (data.value) {
        const { two_factor } = data.value
        determineTwoFactorRoute({ two_factor })
      }
    } catch (error) {
      log('Error trying to log in', error)
    }
  }

  async function getCsrfCookie() {
    try {
      const url = useCsrfCookieUrl()
      const options: RequestInit = {
        method: 'GET'
      }
      const { response } = await useFetchWithCredentials(url, options)
      if (!response.value?.ok) {
        switch (response.value?.status) {
          case 429:
            return setNotification('too-many-attempts', NotificationType.ERROR)
          default:
            return setNotification('failed', NotificationType.ERROR)
        }
      }
    } catch (error) {
      log('Error trying to get csrf cookie', error)
    }
  }

  async function twoFactorChallenge(code: string) {
    try {
      const url = useApiTwoFactorChallengeUrl()
      const options: RequestInit = {
        method: 'POST',
        ...JSONRequestHeaders,
        body: JSON.stringify({ code })
      }
      const { response } = await useFetchWithCredentials(url, options)

      if (!response.value?.ok) {
        switch (response.value?.status) {
          case 422:
            return setNotification('2fa-invalid-code', NotificationType.ERROR)
          default:
            return setNotification('2fa-failed', NotificationType.ERROR)
        }
      }

      if (response.value?.status === 204) {
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
      const data = formatPayloadFromCamelCaseToSnakeCase(payload)

      const options: RequestInit = {
        method: 'PUT',
        ...JSONRequestHeaders,
        body: JSON.stringify(data)
      }
      const { data: json, response } = await useFetchWithCredentials(url, options).json()

      if (!response.value?.ok) {
        try {
          throw new Error(json.value.message)
        } catch (e) {
          const error = e as Error
          throw new Error(error.message ?? response.value?.statusText)
        }
      }

      setNotification('password-update-success', NotificationType.CONFIRMATION)
      router.push({ name: HOME })
    } catch (e) {
      const error = e as Error
      log('Error trying to update password', error)
      setNotification('password-update-failed', NotificationType.ERROR, { error: error?.message })
    }
  }

  async function forgotPassword(payload: { email: string }) {
    await getCsrfCookie()

    const url = useApiForgotPasswordUrl()
    const options = { ...JSONRequestHeaders }
    const useFetchOptions = { onFetchError: fetchErrorMessage }

    return useFetchWithCredentials(url, options, useFetchOptions).post(payload).json()
  }

  async function resetPassword(payload: {
    email: string
    token: string
    password: string
    password_confirmation: string
  }) {
    await getCsrfCookie()

    const url = useApiPasswordResetUrl()
    const options = { ...JSONRequestHeaders }
    const useFetchOptions = { onFetchError: fetchErrorMessage }

    return useFetchWithCredentials(url, options, useFetchOptions).post(payload).json()
  }

  function fetchErrorMessage(ctx: { data: any; response: Response | null; error: any }) {
    if (ctx.data && ctx.data.message) {
      ctx.error = new Error(ctx.data.message)
    }
    return ctx
  }

  function onLoginChange(isLoggedIn: boolean) {
    if (!isLoggedIn) {
      sessionLifetimeStore.removeSession()
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

  on(SessionType.EXPIRING, () => {
    getUserInfo()
  })

  on(SessionType.EXPIRED, () => {
    onLoginChange(false)
  })

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
    checkUserRights,
    forgotPassword,
    resetPassword
  }
})
