import { ref, watch, type Ref } from 'vue'
import { useWindowResize } from '@/@shared/composables/useWindowResize'

export const useFormStepperSize = () => {
  // isLarge is 'false' when the element is wider then the parents element
  const { width } = useWindowResize()
  const isLarge = ref(true)
  const el: Ref<HTMLElement | undefined> = ref(undefined)

  watch(
    () => [width.value, el.value],
    () => {
      // set the el to be large first and re-calculate the width in the next tick
      isLarge.value = true

      setTimeout(() => {
        const target = el?.value
        const parent: HTMLElement = target?.parentNode as HTMLElement
        if (!target || !parent) {
          return
        }
        const { width, x } = target.getBoundingClientRect()
        const { width: parentWidth } = parent.getBoundingClientRect()
        isLarge.value = parentWidth > width + 2 * x
      })
    }
  )
  return {
    el,
    isLarge
  }
}
