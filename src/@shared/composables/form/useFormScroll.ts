import type { Ref } from 'vue'

import { watch } from 'vue'

export const ERROR_ATTRIBUTE = 'data-field-error'

type Props = {
  index: Ref<number>
}

export const useFormScroll = ({ index }: Props) => {
  function scrollToError() {
    // scroll to the first error on the page
    setTimeout(() => {
      const target = document.querySelector(`[${ERROR_ATTRIBUTE}]`)
      if (!target) {
        return
      }

      const top = target.getBoundingClientRect().y + window.scrollY - 18

      window.scroll({
        top,
        behavior: 'smooth'
      })
    })
  }

  // when form index changes, scroll to the top of the page
  watch(
    () => index.value,
    () => {
      window.scrollTo(0, 0)
    },
    { immediate: true }
  )

  return {
    scrollToError
  }
}
