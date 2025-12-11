import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

describe('AppIcon', () => {
  it('can display an icon', async () => {
    const wrapper = mount(AppIcon, {
      props: {
        name: 'search'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can set the optional [aria-hidden] attribute', () => {
    const wrapper = mount(AppIcon, {
      props: {
        name: 'search',
        ariaHidden: true
      }
    })

    expect(wrapper.html()).toContain('aria-hidden="true"')
  })
})
