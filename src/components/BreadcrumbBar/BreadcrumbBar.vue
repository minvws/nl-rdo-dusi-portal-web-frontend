<template>
  <nav
    class="breadcrumb-bar"
    :aria-label="translate('component.breadcrumbBar.ariaLabel')"
  >
    <div>
      <ol>
        <li
          v-for="({ name, params, label }, index) in links"
          :key="index"
        >
          <span v-if="index === links.length - 1">
            {{ label }}
          </span>
          <RouterLink
            v-else
            :to="{ name, params }"
          >
            {{ label }}
          </RouterLink>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { Link } from '@/type/link-types'
import { translate } from '@/i18n'

type Props = {
  links: Link[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.breadcrumb-bar {
  --breadcrumb-bar-background-color: var(--application-base-tint-1-background-color);
  --breadcrumb-bar-icon-text-color: var(--ruby-red-text-color-dark);
  --breadcrumb-bar-link-hover-text-color: var(--ruby-red-text-color-dark);
  --breadcrumb-bar-link-focus-text-color: var(--ruby-red-text-color-dark);
  --breadcrumb-bar-link-text-color: var(--ruby-red-text-color-dark);
  --breadcrumb-bar-link-active-text-color: var(--ruby-red-text-color-dark);
  --breadcrumb-bar-text-color: var(--ruby-red-text-color-dark);
  --breadcrumb-bar-link-visited-text-color: var(--ruby-red-text-color-dark);
}

// only style exact active link
.breadcrumb-bar ol li a.active {
  font-weight: normal;
}

.breadcrumb-bar ol li span {
  padding-right: var(--header-navigation-link-padding-left);
  padding-left: var(--header-navigation-link-padding-left);
  color: var(--breadcrumb-bar-text-color);
}
</style>
