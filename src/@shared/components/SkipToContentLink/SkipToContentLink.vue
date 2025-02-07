<template>
  <a
    href="#main-content"
    class="button skip-to-content"
  >
    {{ t('app.skip-to-content') }}
  </a>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
