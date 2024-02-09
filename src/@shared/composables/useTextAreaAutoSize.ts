import { onMounted, onUnmounted, ref, watch } from 'vue'
import { InputType } from '@shared/types/input'

export const useTextAreaAutoSize = (type: InputType) => {
  const el = ref()

  watch(el, () => onResize())

  onMounted(() => configureListeners('add'))

  onUnmounted(() => configureListeners('remove'))

  function configureListeners(type: 'add' | 'remove'): void {
    window[`${type}EventListener`]('resize', onResize)
  }

  function onResize(): void {
    if (!el.value || type !== InputType.TEXTAREA) {
      return
    }

    el.value.style.height = 'auto'
    const { paddingTop, paddingBottom } = getComputedStyle(el.value)
    const minHeight = Number.parseInt(paddingTop, 10) + Number.parseInt(paddingBottom, 10)
    const height = Math.max(minHeight, el.value.scrollHeight)
    el.value.style.height = `${height}px`
  }

  return {
    el,
    onResize
  }
}
