<template>
  <footer>
    <div>
      <div class="two-thirds-one-third">
        <div></div>
        <nav>
          <div class="column-2">
            <div>
              <h1>{{ t('component.footer.serviceTitle') }}</h1>
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
              <h1>{{ t('component.footer.aboutTitle') }}</h1>
              <ul>
                <li>
                  <RouterLink :to="{ name: ACCESSIBILITY_STATEMENT }">
                    {{ t('component.footer.accessibility') }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: PRIVACY_STATEMENT }">
                    {{ t('component.footer.privacy') }}
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
        <p>{{ t('component.footer.version', { version }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { ACCESSIBILITY_STATEMENT, PRIVACY_STATEMENT } from '@shared/router/names'

import { version } from '@/../package.json'
import { Rel, externalUrls } from '@shared/external-links'

type FooterLink = {
  href: string
  text: string | undefined
  rel: string
}

const { t } = useI18n()

function getExternalLinks(keys: string[]) {
  return keys.map((key) => {
    const { rel: attr, ...link } = externalUrls[key]
    // we remove the Rel.EXTERNAL in the footer-links, because this causes styling issues atm
    const rel = attr
      .split(' ')
      .filter((rel) => rel !== Rel.EXTERNAL)
      .join(' ')

    return {
      text: t(`component.footer.${key}`),
      ...link,
      rel
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
footer {
  @include hide-print;
}

a {
  display: block;
}
</style>
