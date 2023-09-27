import type { Ref } from 'vue'
import type { Modal } from '@shared/types/modal'

import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { usePreventBodyScroll } from '@shared/composables/usePreventBodyScroll'
import { useClickOutside } from '@shared/composables/useClickOutside'

export const useAppModal = defineStore('useAppModal', (persistent = true) => {
  const el: Ref<HTMLDialogElement | HTMLDivElement | null> = ref(null)
  const content: Ref<Modal | undefined> = ref(undefined)

  const getModal = () => {
    const dialog = el.value
    if (!dialog) return
    if (dialog.tagName === 'DIALOG') {
      return dialog as HTMLDialogElement
    }
    return undefined
  }

  const closeModal = () => {
    const dialog = getModal()
    content.value = undefined
    setTimeout(() => {
      // because there is a transition on the dialog, close the dialog with a delay
      dialog?.close()
    }, 200)
  }

  const openModal = (modal: Modal) => {
    content.value = modal
  }

  const setElement = (element: HTMLDialogElement | HTMLDivElement | null) => {
    el.value = element
  }

  const hasModal = computed(() => !!content.value)
  const { onClickOutside } = useClickOutside(closeModal, hasModal, persistent)

  usePreventBodyScroll(hasModal)

  const component = computed(() => {
    const hasNativeDialogSupport =
      typeof window !== 'undefined' &&
      typeof window['HTMLDialogElement'] !== 'undefined' &&
      typeof window['HTMLDialogElement'].prototype.show === 'function'
    return hasNativeDialogSupport ? 'dialog' : 'div'
  })

  watch(
    () => [content.value, el.value],
    () => {
      getModal()?.showModal()
    },
    { immediate: true }
  )

  return {
    el,
    content,
    setElement,
    openModal,
    closeModal,
    onClickOutside,
    component
  }
})
