<template>
  <section>
    <AppIntro
      v-bind="{
        title: translate('pages.not-found.title'),
        intro: translate('pages.not-found.subtitle'),
        body: translate('pages.not-found.intro')
      }"
    />
    <div>
      <div class="horizontal-view">
        <button
          class="button"
          @click="goBack"
        >
          <AppIcon
            name="chevron-light-left"
            aria-hidden="true"
          />
          {{ translate('pages.not-found.back') }}
        </button>
        <span class="separator">of</span>
        <RouterLink
          to="/"
          class="button"
        >
          {{ translate('pages.not-found.home') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { translate } from '@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppIntro from '@shared/components/AppIntro/AppIntro.vue'

useSEO({
  title: `${translate('pages.not-found.title')} | ${translate('app.prefix')}`
})

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>
