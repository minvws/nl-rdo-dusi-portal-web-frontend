import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'

vi.mock('vue-router')

describe('AppHtml', () => {
  vi.mocked(useRouter).mockReturnValue({
    push: vi.fn()
  })

  beforeEach(() => {
    vi.mocked(useRouter().push).mockReset()
  })

  it('can display HTML', () => {
    const wrapper = mount(AppHtml, {
      props: {
        html: '<a id="lorem-ipsum" class="lorem-ipsum" href="/lorem-ipsum">Lorem ipsum</a>'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can handle click events', () => {
    const wrapper = mount(AppHtml, {
      props: {
        html: '<a id="lorem-ipsum" class="lorem-ipsum" href="/lorem-ipsum">Lorem ipsum</a>'
      }
    })

    expect(useRouter().push).not.toHaveBeenCalled()

    wrapper.find('a').trigger('click')

    expect(useRouter().push).toHaveBeenCalled()
  })
})
