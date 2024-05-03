<template>
  <AppButton
    v-if="isLoggedIn"
    class="authentication-button"
    @click="logOut"
  >
    {{ t('component.header.logout') }}
  </AppButton>
  <RouterLink
    v-else
    class="authentication-button"
    :to="{ name: LOGIN_VIEW }"
  >
    {{ t('component.header.login') }}
  </RouterLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@assessment/store/useAuthStore'
import { useFormStorage } from '@shared/store/useFormStorage'
import { usePendingFileStore } from '@shared/store/usePendingFileStore'

import AppButton from '@shared/components/AppButton/AppButton.vue'

import { LOGIN_VIEW } from '@assessment/router/names'

const { t } = useI18n()
const formStorage = useFormStorage()
const pendingFileStorage = usePendingFileStore()
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

function logOut() {
  formStorage.clearAll()
  pendingFileStorage.clearAll()
  authStore.logOut()
}
</script>

<style lang="scss" scoped>
.authentication-button {
  --header-navigation-button-justify-content: flex-start;
  --header-navigation-collapsible-collapsing-element-list-item-button-width: 100%;
  --header-navigation-collapsible-collapsing-element-list-item-button-padding-left: var(
    --header-navigation-collapsible-list-item-link-padding-left
  );
  --header-navigation-collapsible-collapsing-element-list-item-button-padding-right: var(
    --header-navigation-collapsible-list-item-link-padding-right
  );
  --header-navigation-button-min-height: 48px;

  @include desktop {
    --header-navigation-button-min-height: 64px;
    --header-navigation-button-padding-right: 0.5rem;
    --header-navigation-button-padding-left: 0.5rem;
    --header-navigation-collapsible-collapsing-element-list-item-button-border-width: 0;
  }
}
</style>
