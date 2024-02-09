<template>
  <section>
    <AppIntro
      :title="t('pages.not-found.title')"
      :intro="t('pages.not-found.subtitle')"
      :body="t('pages.not-found.intro')"
    />
    <div>
      <div class="horizontal-view">
        <button
          class="button"
          @click="goBack"
        >
          <AppIcon
            name="chevron-light-left"
            aria-hidden
          />
          {{ t('pages.not-found.back') }}
        </button>
        <span class="separator">of</span>
        <RouterLink
          to="/"
          class="button"
        >
          {{ t('pages.not-found.home') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'
import AppIntro from '@shared/components/AppIntro/AppIntro.vue'

const { t } = useI18n()
const router = useRouter()

useSEO({
  title: `${t('pages.not-found.title')} | ${t('app.prefix')}`
})

function goBack() {
  router.go(-1)
}
</script>
