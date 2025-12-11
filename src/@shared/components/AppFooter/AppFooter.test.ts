import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppFooter from '@shared/components/AppFooter/AppFooter.vue'

const wrapper = mount(AppFooter)

describe('AppFooter', () => {
  it('contains more than 1 "service" link', () => {
    const serviceLinks = wrapper.find('[data-test="service-links"]')

    expect(serviceLinks.element.children.length).toBeGreaterThan(1)
  })

  it('contains more than 1 "about" link', () => {
    const aboutLinks = wrapper.find('[data-test="about-links"]')

    expect(aboutLinks.element.children.length).toBeGreaterThan(1)
  })

  it('contains anchor tags with "rel" attribute', () => {
    const links = wrapper.findAll('a[rel]')

    for (const link of links) {
      expect(link.attributes().rel).toContain('noopener')
    }
  })

  it('contains anchor tags with "href" attribute', () => {
    const links = wrapper.findAll('a[href]')

    for (const link of links) {
      expect(link.attributes().href).toBeDefined()
    }
  })

  it('contains RouterLinks with with route names', () => {
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBeDefined()
  })

  it('contains the version number', () => {
    const version = wrapper.find('.meta')

    expect(version.text()).toContain('Versie')
  })
})
