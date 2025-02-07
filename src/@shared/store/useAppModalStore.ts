import type { Modal } from '@shared/types/modal'

import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { defineStore } from 'pinia'

import { usePreventBodyScroll } from '@shared/composables/usePreventBodyScroll'

export const useAppModalStore = defineStore('useAppModalStore', () => {
  const el = ref<HTMLDialogElement | HTMLDivElement | undefined>(undefined)
  const content = ref<Modal | undefined>(undefined)
  const persistent = ref<boolean>(true)

  const hasModal = computed<boolean>(() => !!content.value)

  const component = computed<'dialog' | 'div'>(() =>
    typeof window !== 'undefined' &&
    window['HTMLDialogElement'] !== undefined &&
    typeof window['HTMLDialogElement'].prototype.show === 'function'
      ? 'dialog'
      : 'div'
  )

  function getModal(): HTMLDialogElement | undefined {
    const element = el.value
    const isDialogElement = element?.tagName === 'DIALOG' && element instanceof HTMLDialogElement

    return isDialogElement ? element : undefined
  }

  function closeModal(): void {
    const dialog = getModal()
    content.value = undefined
    setTimeout(() => {
      // because there is a transition on the dialog, close the dialog with a delay
      dialog?.close()
    }, 200)
  }

  function openModal(modal: Modal): void {
    content.value = modal
  }

  function setElement(element: HTMLDialogElement | HTMLDivElement | undefined): void {
    el.value = element
  }

  function setPersistence(persist: boolean): void {
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

  function onKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !hasModal.value) {
      return
    }

    event.preventDefault()
    event.stopImmediatePropagation()

    if (persistent.value) {
      return
    }

    closeModal()
  }

  function onClickOutside(): void {
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
