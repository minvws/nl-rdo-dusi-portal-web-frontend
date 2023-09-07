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
                  v-for="({ url, label }, index) in serviceLinks"
                  :key="index"
                >
                  <a :href="url">
                    {{ label }}
                  </a>
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
                  v-for="({ url, label }, index) in aboutLinks"
                  :key="index"
                >
                  <a :href="url">
                    {{ label }}
                  </a>
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

type FooterLink = {
  url: string
  label: string | undefined
}

const serviceLinks: FooterLink[] = [
  { label: translate('component.footer.contact'), url: 'https://www.dus-i.nl/contact' },
  { label: translate('component.footer.documents'), url: 'https://www.dus-i.nl/documenten' },
  { label: translate('component.footer.abuse'), url: 'https://www.dus-i.nl/misbruik-en-fraude' },
  { label: translate('component.footer.disagree'), url: 'https://www.dus-i.nl/oneens-met-dus-i' },
  { label: translate('component.footer.law'), url: 'https://www.dus-i.nl/wet-open-overheid' },
  { label: translate('component.footer.about'), url: 'https://www.dus-i.nl/over-ons' }
]

const aboutLinks: FooterLink[] = [
  { label: translate('component.footer.copyright'), url: 'https://www.dus-i.nl/copyright' },
  { label: translate('component.footer.disclaimer'), url: 'https://www.dus-i.nl/disclaimer' },
  {
    label: translate('component.footer.vulnerability'),
    url: 'https://www.dus-i.nl/kwetsbaarheid-melden'
  }
]
</script>

<style lang="scss" scoped>
a {
  display: block;
}
</style>
