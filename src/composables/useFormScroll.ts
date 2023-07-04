import { watch } from 'vue'

export const ERROR_ATTRIBUTE = 'data-field-error'

export const useFormScroll = (store: { index: number }) => {
  // when form index changes, scroll to the top of the page
  watch(
    () => store.index,
    () => {
      window.scrollTo(0, 0)
    },
    { immediate: true }
  )

  const scrollToError = () => {
    // scroll to the first error on the page
    setTimeout(() => {
      const target = document.querySelector(`[${ERROR_ATTRIBUTE}]`)
      if (!target) return
      const top = target.getBoundingClientRect().y + window.scrollY - 18
      window.scroll({
        top,
        behavior: 'smooth'
      })
    })
  }

  return {
    scrollToError
  }
}
