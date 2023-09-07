<template>
  <footer>
    <div>
      <div class="two-thirds-one-third">
        <span class="slogan">{{ translate('component.footer.slogan') }}</span>
        <nav>
          <div class="column-2">
            <div>
              <h1>{{ translate('component.footer.serviceTitle') }}</h1>
              <ul>
                <li
                  v-for="(link, index) in serviceLinks"
                  :key="index"
                >
                  <a v-bind="link" />
                </li>
              </ul>
            </div>
            <div>
              <h1>{{ translate('component.footer.aboutTitle') }}</h1>
              <ul>
                <li>
                  <RouterLink :to="{ name: ACCESSIBILITY_STATEMENT }">
                    {{ translate('component.footer.accessibility') }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: PRIVACY_STATEMENT }">
                    {{ translate('component.footer.privacy') }}
                  </RouterLink>
                </li>
                <li
                  v-for="(link, index) in aboutLinks"
                  :key="index"
                >
                  <a v-bind="link" />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div class="meta">
        <p>{{ translate('component.footer.version', { version }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'
import { ACCESSIBILITY_STATEMENT, PRIVACY_STATEMENT } from '@shared/router/names'

import { version } from '@/../package.json'
import { externalUrls } from '@/@shared/external-links'

type FooterLink = {
  href: string
  text: string | undefined
  rel: string
}

const getExternalLinks = (keys: string[]) => {
  return keys.map(key => {
    return {
      text: translate(`component.footer.${key}`),
      ...externalUrls[key]
    }
  })
}

const serviceLinks: FooterLink[] = getExternalLinks([
  'contact',
  'documents',
  'abuse',
  'disagree',
  'law',
  'about'
])

const aboutLinks: FooterLink[] = getExternalLinks(['copyright', 'disclaimer', 'vulnerability'])
</script>

<style lang="scss" scoped>
a {
  display: block;
}
</style>
