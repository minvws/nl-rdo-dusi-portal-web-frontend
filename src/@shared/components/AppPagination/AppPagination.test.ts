import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppPagination from '@shared/components/AppPagination/AppPagination.vue'

describe('AppPagination', () => {
  it('renders pagination items', () => {
    const wrapper = mount(AppPagination, {
      props: {
        itemsTotal: 40,
        pageSize: 10,
        currentPage: 1
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('with many items renders a "condensed" layout', () => {
    const wrapper = mount(AppPagination, {
      props: {
        itemsTotal: 100,
        pageSize: 10,
        currentPage: 5
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the "condensed" layout correctly', () => {
    const wrapper = mount(AppPagination, {
      props: {
        itemsTotal: 100,
        pageSize: 10,
        currentPage: 5
      }
    })
    const items = wrapper.findAll('li')

    expect(wrapper.html()).toMatchSnapshot()

    expect(items.length).toBe(7)

    for (let i = 0; i < items.length; i++) {
      if (i === 1 || i === items.length - 2) {
        expect(items[i].html()).toContain('…')
      } else if (i === 3) {
        expect(items[i].html()).toContain('<button type="button" disabled="" aria-current="true">')
      } else {
        expect(items[i].html()).toContain('<button type="button">')
      }
    }
  })
})
