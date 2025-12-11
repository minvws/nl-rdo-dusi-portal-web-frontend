import { describe, expect, it } from 'vitest'

import BreadcrumbBar from '@shared/components/BreadcrumbBar/BreadcrumbBar.vue'
import { mount } from '@vue/test-utils'

describe('BreadcrumbBar', () => {
  it('renders the first item different from the rest', () => {
    const wrapper = mount(BreadcrumbBar, {
      props: {
        links: [
          {
            name: 'home',
            label: 'Home'
          },
          {
            name: 'sub-page',
            label: 'Sub page'
          }
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
