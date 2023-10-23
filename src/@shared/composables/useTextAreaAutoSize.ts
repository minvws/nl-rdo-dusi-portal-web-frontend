import { onMounted, onUnmounted, ref, watch } from 'vue'
import { InputType } from '@shared/types/input'

export const useTextAreaAutoSize = (type: InputType) => {
  const el = ref()

  watch(el, () => onResize())

  onMounted(() => configureListeners('add'))

  onUnmounted(() => configureListeners('remove'))

  const configureListeners = (type: 'add' | 'remove') => {
    window[`${type}EventListener`]('resize', onResize)
  }

  const onResize = () => {
    if (!el.value || type !== InputType.TEXTAREA) return
    el.value.style.height = 'auto'
    const style = getComputedStyle(el.value)
    const { paddingTop, paddingBottom } = style
    const minHeight = parseInt(paddingTop) + parseInt(paddingBottom)
    const height = Math.max(minHeight, el.value.scrollHeight)
    el.value.style.height = `${height}px`
  }
  return {
    el,
    onResize
  }
}
