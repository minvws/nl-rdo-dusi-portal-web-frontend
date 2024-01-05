import type { Modal } from '@shared/types/modal'

import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { defineStore } from 'pinia'

import { usePreventBodyScroll } from '@shared/composables/usePreventBodyScroll'

export const useAppModalStore = defineStore('useAppModalStore', () => {
  const el = ref<HTMLDialogElement | HTMLDivElement | null>(null)
  const content = ref<Modal | undefined>(undefined)
  const persistent = ref<boolean>(true)

  const hasModal = computed<boolean>(() => !!content.value)

  const component = computed<'dialog' | 'div'>(() =>
    typeof window !== 'undefined' &&
    typeof window['HTMLDialogElement'] !== 'undefined' &&
    typeof window['HTMLDialogElement'].prototype.show === 'function'
      ? 'dialog'
      : 'div'
  )

  function getModal() {
    const dialog = el.value
    if (!dialog) return
    if (dialog.tagName === 'DIALOG') {
      return dialog as HTMLDialogElement
    }
    return undefined
  }

  function closeModal() {
    const dialog = getModal()
    content.value = undefined
    setTimeout(() => {
      // because there is a transition on the dialog, close the dialog with a delay
      dialog?.close()
    }, 200)
  }

  function openModal(modal: Modal) {
    content.value = modal
  }

  function setElement(element: HTMLDialogElement | HTMLDivElement | null) {
    el.value = element
  }

  function setPersistence(persist: boolean) {
    persistent.value = persist
  }

  usePreventBodyScroll(hasModal)

  watch(
    () => [content.value, el.value],
    () => {
      getModal()?.showModal()
    },
    { immediate: true }
  )

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Escape' || !hasModal.value) {
      return
    }

    e.preventDefault()
    e.stopImmediatePropagation()

    if (persistent.value) {
      return
    }

    closeModal()
  }

  function onClickOutside() {
    if (persistent.value) {
      return
    }

    closeModal()
  }

  onMounted(() => document.addEventListener('keydown', onKeyDown))

  onUnmounted(() => document.removeEventListener('keydown', onKeyDown))

  return {
    closeModal,
    component,
    content,
    el,
    onClickOutside,
    openModal,
    setPersistence,
    setElement
  }
})
