<template>
  <RouterLink
    v-bind="$props"
    custom
    v-slot="{ href, navigate, isActive, isExactActive }"
  >
    <a
      :href="href"
      @click="navigate"
      :aria-current="isActive ? (isExactActive ? 'page' : 'true') : undefined"
      :class="{ active: isActive, 'exact-active': isExactActive }"
    >
      <slot />
    </a>
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'

import { defineProps } from 'vue'

defineProps<RouterLinkProps>()
</script>
