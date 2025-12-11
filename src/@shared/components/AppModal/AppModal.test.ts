import { ModalType } from '@shared/types/modal'

import { beforeEach, describe, expect, it } from 'vitest'
import { storeToRefs, setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

import { useAppModalStore } from '@shared/store/useAppModalStore'

import AppModal from '@shared/components/AppModal/AppModal.vue'

describe('AppModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can be created', () => {
    mount(AppModal)
    const modalStore = useAppModalStore()
    const { content } = storeToRefs(modalStore)

    expect(content.value).toBe(undefined)

    content.value = {
      type: ModalType.DEFAULT,
      title: 'test',
      message: 'test'
    }

    expect(content.value).toStrictEqual({
      type: ModalType.DEFAULT,
      title: 'test',
      message: 'test'
    })
  })
})
