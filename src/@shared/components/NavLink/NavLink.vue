<template>
  <RouterLink
    v-bind="$props"
    custom
    v-slot="{ href, navigate, isActive, isExactActive }"
  >
    <a
      :href="href"
      :aria-current="isActive ? (isExactActive ? 'page' : 'true') : undefined"
      :class="{ active: isActive, 'exact-active': isExactActive }"
      @click="navigate"
    >
      <slot />
    </a>
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'

defineProps<RouterLinkProps>()
</script>
