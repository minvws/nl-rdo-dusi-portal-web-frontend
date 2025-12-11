import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppButton from '@shared/components/AppButton/AppButton.vue'

describe('AppButton', () => {
  it('can render without text', () => {
    const wrapper = mount(AppButton)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can render with text', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can be disabled', () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can change type', () => {
    const wrapper = mount(AppButton, {
      props: {
        type: 'submit'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can emit a click event', () => {
    const wrapper = mount(AppButton)

    wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })
})
