import { NotificationType } from '@shared/types/notification'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRouter } from 'vue-router'
import { mount } from '@vue/test-utils'

import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

vi.mock('vue-router')

describe('FormNotification', () => {
  vi.mocked(useRouter).mockReturnValue({
    beforeEach: vi.fn()
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(useRouter().beforeEach).mockReset()
  })

  it('can render a dismissable notification', () => {
    const wrapper = mount(FormNotification, {
      props: {
        message: 'Test',
        displayAs: NotificationType.CONFIRMATION,
        dismissable: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render a notification with an extra label', () => {
    const wrapper = mount(FormNotification, {
      props: {
        message: 'Test',
        displayAs: NotificationType.CONFIRMATION,
        label: 'Label'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render a notification with extra ARIA attributes', () => {
    const wrapper = mount(FormNotification, {
      props: {
        message: 'Test',
        displayAs: NotificationType.CONFIRMATION,
        announce: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render a "confirmation" notification', () => {
    const wrapper = mount(FormNotification, {
      props: {
        message: 'Test',
        displayAs: NotificationType.CONFIRMATION
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render a "error" notification', () => {
    const wrapper = mount(FormNotification, {
      props: {
        message: 'Test',
        displayAs: NotificationType.ERROR
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render a "explanation" notification', () => {
    const wrapper = mount(FormNotification, {
      props: {
        message: 'Test',
        displayAs: NotificationType.EXPLANATION
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render a "warning" notification', () => {
    const wrapper = mount(FormNotification, {
      props: {
        message: 'Test',
        displayAs: NotificationType.WARNING
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
