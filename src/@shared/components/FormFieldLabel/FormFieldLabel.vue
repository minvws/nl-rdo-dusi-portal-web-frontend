<template>
  <label class="label">
    {{ label }}
  </label>
</template>

<script setup lang="ts">
type Props = {
  label: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
@use "@shared/styles/mixins.scss";

.label {
  @include mixins.mobile {
    margin: 0.5rem 0 0.2rem 0;
  }
}
</style>
