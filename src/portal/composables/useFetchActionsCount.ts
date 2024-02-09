import { computed, watch } from 'vue'
import { useAuthStore } from '@portal/store/useAuthStore'
import { useApiActionsCountUrl } from '@portal/composables/useApiUrl'
import { useCustomFetch } from '@shared/composables/useCustomFetch'
import { storeToRefs } from 'pinia'

export const useFetchActionsCount = () => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)
  const url = useApiActionsCountUrl()
  const {
    data: json,
    execute,
    ...fetch
  } = useCustomFetch('with-encryption', url, undefined, { immediate: false }).json()

  const data = computed(() => json.value || {})

  watch(
    isLoggedIn,
    (isLoggedIn: boolean) => {
      // only fetch when user is logged-in
      if (!isLoggedIn) return
      execute()
    },
    { immediate: true }
  )

  return {
    data,
    ...fetch
  }
}
