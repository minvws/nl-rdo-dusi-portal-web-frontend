<template>
  <section class="background-color-offset">
    <div>
      <h2>{{ translate('component.moreInfo.title') }}</h2>
      <p
        class="emphasized"
        v-html="translate('component.moreInfo.body1')"
      />
      <p
        class="emphasized"
        v-html="translate('component.moreInfo.body2')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'
</script>
