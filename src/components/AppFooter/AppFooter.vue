<template>
  <footer>
    <div>
      <div class="two-thirds-one-third">
        <span class="slogan">{{ translate('component.footer.slogan') }}</span>
        <nav aria-labelledby="footer-nav-1-heading">
          <h1 id="footer-nav-1-heading">{{ translate('component.footer.title') }}</h1>
          <ul>
            <li v-for="({ name, label, params }, index) in footerLinks" :key="index">
              <RouterLink :to="{ name, params }">
                {{ label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="meta">
        <p>{{ translate('component.footer.version', { version }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'
import { version } from '@/../package.json'
import { useFooterLinks } from '@/composables/useLinks'

const footerLinks = useFooterLinks()
</script>
