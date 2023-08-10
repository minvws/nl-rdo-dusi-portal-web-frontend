<template>
  <section class="background-color-offset">
    <div>
      <h2>{{ translate('component.notificationObligation.title') }}</h2>
      <p class="emphasized">{{ translate('component.notificationObligation.body1') }}</p>
      <h3>{{ translate('component.notificationObligation.subtitle') }}</h3>
      <p>{{ translate('component.notificationObligation.body2') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'
</script>
