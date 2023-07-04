<template>
  <span class="nota-bene">{{ translate('form.field.required') }}</span>
</template>

<script setup lang="ts">
import { translate } from '@/i18n'
</script>

<style lang="scss" scoped>
span {
  margin-bottom: 0.5em;
}
</style>
