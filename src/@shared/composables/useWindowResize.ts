import { onBeforeUnmount, onMounted, ref } from 'vue'

export const useWindowResize = (debounceTime = 100) => {
  const width = ref(0)
  const height = ref(0)

  let timeout: ReturnType<typeof setTimeout> | undefined

  const clearDebounce = () => {
    clearTimeout(timeout)
  }

  const onResize = (e?: Event) => {
    clearDebounce()
    timeout = setTimeout(
      () => {
        width.value = window.innerWidth
        height.value = window.innerHeight
      },
      e ? debounceTime : 0
    )
  }
  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    clearDebounce()
  })

  return {
    width,
    height
  }
}
