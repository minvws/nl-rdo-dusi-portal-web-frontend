import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import { mount } from '@vue/test-utils'

import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'

vi.mock('vue-router')

describe('AppSuspense', () => {
  vi.mocked(useRouter).mockReturnValue({
    beforeEach: vi.fn()
  })

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      beforeEach: vi.fn()
    })
  })

  it('can render as any given HTML element', () => {
    const wrapper = mount(AppSuspense, {
      props: {
        as: 'section',
        isFetching: false,
        data: undefined,
        error: undefined
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows a loader when fetching', () => {
    const wrapper = mount(AppSuspense, {
      props: {
        isFetching: true,
        showLoader: true,
        data: undefined,
        error: undefined
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows a notification when an error has occured', () => {
    const wrapper = mount(AppSuspense, {
      props: {
        isFetching: false,
        data: undefined,
        error: new Error('An error has occured')
      },
      slots: {
        default: '<div>foo</div>'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows the component when the data is fetched', () => {
    const wrapper = mount(AppSuspense, {
      props: {
        isFetching: false,
        data: { id: 'test' },
        error: undefined
      },
      slots: {
        default: '<div class="my-custom-component">id: test</div>'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows a fallback element fetching is done and there is no data', () => {
    const wrapper = mount(AppSuspense, {
      props: {
        isFetching: false,
        data: undefined,
        error: undefined
      },
      slots: {
        default: '<div>foo</div>',
        fallback: '<div>bar</div>'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
