<template>
  <section class="background-color-offset">
    <div>
      <h2>{{ translate('component.moreInfo.title') }}</h2>
      <AppHtml
        class="emphasized"
        as="p"
        :html="translate('component.moreInfo.body1')"
      />
      <AppHtml
        class="emphasized"
        as="p"
        :html="translate('component.moreInfo.body2')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'
import AppHtml from '@/components/AppHtml/AppHtml.vue'
</script>
