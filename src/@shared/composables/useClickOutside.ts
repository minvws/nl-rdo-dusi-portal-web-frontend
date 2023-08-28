import { onMounted, onUnmounted } from 'vue'

export const useClickOutside = (cb: () => void, persistent = false) => {
  const onKeyDown = (e: KeyboardEvent) => {
    const { key } = e
    if (key !== 'Escape') return

    e.preventDefault()
    e.stopImmediatePropagation()
    if (persistent) return

    cb()
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeyDown)
  })

  const onClickOutside = () => {
    if (persistent) return
    cb()
  }
  return {
    onClickOutside
  }
}
