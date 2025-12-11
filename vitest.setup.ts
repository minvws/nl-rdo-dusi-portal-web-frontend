import { config, RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from './src/@shared/i18n'

const pinia = createTestingPinia({
  fakeApp: true,
})

config.global.stubs = {
  RouterLink: RouterLinkStub,
}

i18n().then((i18n) => {
  config.global.plugins = [i18n, pinia]
})
