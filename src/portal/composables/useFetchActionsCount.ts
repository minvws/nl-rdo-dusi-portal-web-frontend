import { computed, watch } from 'vue'
import { useAuthStore } from '@portal/store/useAuthStore'
import { useApiActionsCountUrl } from '@portal/composables/useApiUrl'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { storeToRefs } from 'pinia'

export const useFetchActionsCount = () => {
  const { isLoggedIn } = storeToRefs(useAuthStore())
  const url = useApiActionsCountUrl()
  const {
    data: json,
    execute,
    ...fetch
  } = useFetchWithCredentials(url, undefined, { immediate: false }).json()

  const data = computed(() => (json.value ? json.value : {}))

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
