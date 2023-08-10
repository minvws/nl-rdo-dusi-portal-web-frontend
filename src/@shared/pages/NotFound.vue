<template>
  <section>
    <div>
      <h1>{{ translate('pages.not-found.title') }}</h1>
      <p class="emphasized">{{ translate('pages.not-found.subtitle') }}</p>
      <p>{{ translate('pages.not-found.intro') }}</p>
      <nav>
        <ul>
          <li>
            <router-link :to="{ name: HOME }">{{ translate('app.name') }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import useSEO from '@shared/composables/useSeo'

import { HOME } from '@shared/router/names'

useSEO({
  title: `${translate('app.prefix')} | ${translate('pages.not-found.title')}`
})
</script>
