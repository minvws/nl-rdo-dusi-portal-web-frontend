<template>
  <div
    v-if="user"
    class="account-button"
  >
    <p>{{ t('component.header.loggedInAs') }}</p>
    <RouterLink :to="{ name: PROFILE_VIEW }">
      <AppIcon
        name="user"
        aria-hidden
      />
      {{ user.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@assessment/store/useAuthStore'

import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

import { PROFILE_VIEW } from '@assessment/router/names'

const { t } = useI18n()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style lang="scss" scoped>
.account-button {
  display: flex;
  align-items: center;

  @include mobile {
    width: 100%;
  }

  a {
    --header-navigation-link-padding-top: 4px;
    --header-navigation-link-padding-right: 4px;
    --header-navigation-link-padding-bottom: 4px;
    --header-navigation-link-padding-left: 4px;
    --header-navigation-link-hover-text-color: var(--ruby-red-text-color-dark);

    text-decoration: underline;

    @include desktop {
      --header-navigation-link-min-height: 64px;
      --header-navigation-link-padding-left: 0.5rem;
      --header-navigation-link-padding-right: 0.5rem;

      font-weight: bold;
    }
  }

  p {
    padding-right: 0.25rem;

    @include mobile {
      display: none;
    }
  }

  .app-icon {
    @include desktop {
      display: none;
    }
  }
}
</style>
