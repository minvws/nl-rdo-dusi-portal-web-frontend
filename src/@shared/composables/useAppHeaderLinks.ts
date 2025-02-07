import { appHeaderLinksLoader } from '@shared/utils/loader'

export const useAppHeaderLinks = async () => {
  const { useAppHeaderLinks } = await appHeaderLinksLoader()
  return useAppHeaderLinks()
}
