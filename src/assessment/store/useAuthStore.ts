import type { NotificationDisplayType } from '@shared/types/notification'
import type { RouteRecordName } from 'vue-router'
import type { TwoFactorResponse } from '@shared/types/api-response'
import type { User, UserRole } from '@shared/types/user'

import { NotificationType } from '@shared/types/notification'
import { SessionType } from '@shared/types/session'
import { UserRoleNameType } from '@shared/types/user'

import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { JSONRequestHeaders } from '@shared/composables/useFetchHeaders'
import { useDispatcher } from '@shared/store/useDispatcher'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useSessionLifetimeStore } from '@shared/store/useSessionLifetimeStore'

import { formatPayloadFromCamelCaseToSnakeCase } from '@shared/utils/format'
import { getSessionCookie } from '@shared/utils/session-cookie'
import { log } from '@shared/utils/logger'

import { t } from '@shared/i18n'

import {
  CHECKS_OVERVIEW,
  HOME,
  LOGIN_VIEW,
  REPORTS_OVERVIEW,
  TWO_FACTOR_VIEW
} from '@assessment/router/names'

import roleRoutes from '@assessment/router/role-routes'

import {
  useApiCsrfCookieUrl,
  useApiForgotPasswordUrl,
  useApiLoginUrl,
  useApiLogoutUrl,
  useApiPasswordResetUrl,
  useApiPasswordUpdateUrl,
  useApiTwoFactorChallengeUrl,
  useApiUserStatusUrl
} from '@assessment/composables/useApiUrl'

export const useAuthStore = defineStore('useAuthStore', () => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const sessionLifetimeStore = useSessionLifetimeStore()
  const { on } = useDispatcher()

  const canVisitRoute = ref<boolean>(false)
  const homeRoute = ref<string>(HOME)
  const isLoggedIn = ref<boolean>(false)
  const needsTwoFactor = ref<boolean>(false)
  const user = ref<User | undefined>(undefined)

  const userRoles = computed<UserRole[]>(() => user.value?.roles ?? [])
  const isPasswordExpired = computed<boolean>(() => Boolean(user.value?.passwordExpired))

  async function getUserInfo(routeName?: RouteRecordName | undefined) {
    const session = getSessionCookie()

    if (routeName === 'login-view' && !session) {
      return
    }

    try {
      const url = useApiUserStatusUrl()
      const options: RequestInit = {
        method: 'GET',
        ...JSONRequestHeaders
      }
      const { data, response } = await useFetchWithCredentials(url, options).json()

      if (response.value?.ok) {
        user.value = data.value.data
        isLoggedIn.value = true
        sessionLifetimeStore.extendSession()
      } else {
        user.value = undefined
        isLoggedIn.value = false
        sessionLifetimeStore.removeSession()
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
        user.value = undefined
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
          case 422: {
            return setNotification('login-invalid-credentials', NotificationType.ERROR)
          }
          case 429: {
            return setNotification('login-too-many-attempts', NotificationType.ERROR)
          }
          default: {
            return setNotification('login-failed', NotificationType.ERROR)
          }
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
      const url = useApiCsrfCookieUrl()
      const options: RequestInit = {
        method: 'GET'
      }
      const { response } = await useFetchWithCredentials(url, options)
      if (!response.value?.ok) {
        switch (response.value?.status) {
          case 429: {
            return setNotification('too-many-attempts', NotificationType.ERROR)
          }
          default: {
            return setNotification('failed', NotificationType.ERROR)
          }
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
          case 422: {
            return setNotification('2fa-invalid-code', NotificationType.ERROR)
          }
          default: {
            return setNotification('2fa-failed', NotificationType.ERROR)
          }
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
        } catch (error) {
          const { message } = error as Error
          throw new Error(message ?? response.value?.statusText)
        }
      }

      setNotification('password-update-success', NotificationType.CONFIRMATION)
      router.push({ name: HOME })
    } catch (error) {
      const { message } = error as Error
      log('Error trying to update password', error)
      setNotification('password-update-failed', NotificationType.ERROR, { error: message })
    }
  }

  async function forgotPassword(payload: { email: string }) {
    await getCsrfCookie()

    const url = useApiForgotPasswordUrl()
    const options = { ...JSONRequestHeaders }

    return useFetchWithCredentials(url, options).post(payload).json()
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

    return useFetchWithCredentials(url, options).post(payload).json()
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
      label: t(`authentication.${id}.label`, props) ?? '',
      message: t(`authentication.${id}.message`, props) ?? '',
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

  function verifyRouteForUserRole(routeName: string) {
    for (const { name } of userRoles.value) {
      const routes = roleRoutes[name]
      const routeIsValid = routes.length > 0 && routes.includes(routeName)

      if (routeIsValid) {
        canVisitRoute.value = routeIsValid
        return
      }
    }
  }

  function setHomeRoute() {
    const hasAuditorRole = userRoles.value.find(
      (role) => role.name === UserRoleNameType.INTERNAL_AUDITOR
    )
    const hasExporterRole = userRoles.value.find(
      (role) => role.name === UserRoleNameType.DATA_EXPORTER
    )

    if (hasAuditorRole) {
      homeRoute.value = CHECKS_OVERVIEW
    }

    if (hasExporterRole) {
      homeRoute.value = REPORTS_OVERVIEW
    }
  }

  on(SessionType.EXPIRING, () => {
    getUserInfo()
  })

  on(SessionType.EXPIRED, () => {
    onLoginChange(false)
  })

  watch(isLoggedIn, (isLoggedIn) => onLoginChange(isLoggedIn))

  return {
    canVisitRoute,
    forgotPassword,
    getUserInfo,
    homeRoute,
    isLoggedIn,
    isPasswordExpired,
    logIn,
    logOut,
    needsTwoFactor,
    resetPassword,
    setHomeRoute,
    twoFactorChallenge,
    updatePassword,
    user,
    verifyRouteForUserRole
  }
})
