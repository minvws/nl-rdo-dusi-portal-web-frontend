<template>
  <RouterLink
    v-bind="$attrs"
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
