export const useAppHeaderLinks = async () => {
  const { useAppHeaderLinks } = await import(
    /* @vite-ignore */ `./../../${import.meta.env.VITE_PROJECT}/composables/useAppHeaderLinks`
  )
  return useAppHeaderLinks()
}
