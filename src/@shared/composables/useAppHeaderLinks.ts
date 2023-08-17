import { appHeaderLinksLoader } from '../utils/loader'

export const useAppHeaderLinks = async () => {
  const { useAppHeaderLinks } = await appHeaderLinksLoader()
  return useAppHeaderLinks()
}
