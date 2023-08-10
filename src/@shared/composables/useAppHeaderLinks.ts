export const useAppHeaderLinks = async () => {
  const project = import.meta.env.VITE_PROJECT
  const { useAppHeaderLinks } = await import(
    /* @vite-ignore */ `./../../${project}/composables/useAppHeaderLinks`
  )
  return useAppHeaderLinks()
}
