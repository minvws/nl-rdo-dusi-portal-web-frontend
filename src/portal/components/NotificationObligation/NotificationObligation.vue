<template>
  <section class="background-color-offset">
    <div>
      <h2>{{ t('component.notificationObligation.title') }}</h2>
      <p>{{ t('component.notificationObligation.body1') }}</p>
      <h3>{{ t('component.notificationObligation.subtitle') }}</h3>
      <p>{{ t('component.notificationObligation.body2') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
