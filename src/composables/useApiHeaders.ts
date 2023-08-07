import { getCSRFToken } from "@/util/cookie-util"

export const useApiHeaders = () => {
  const token = getCSRFToken()
  if (token) {
    return {
      'XSRF-TOKEN': token
    }
  }
  return undefined
}
