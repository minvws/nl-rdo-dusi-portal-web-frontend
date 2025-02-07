<template>
  <section>
    <div>
      <h1>{{ t('pages.profile.title') }}</h1>
      <p>{{ t('pages.profile.intro') }}</p>
    </div>
    <div>
      <h3>{{ t('pages.profile.information') }}</h3>
      <DescriptionList :items="profileData" />
    </div>
    <div>
      <h3>{{ t('pages.profile.roles') }}</h3>
      <DescriptionList :items="roles" />
    </div>
    <div>
      <h3>{{ t('pages.profile.actions') }}</h3>
      <RouterLink
        :to="{ name: PASSWORD_UPDATE_VIEW }"
        class="button ghost"
      >
        {{ t('pages.profile.updatePassword') }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DescriptionListItem } from '@shared/types/details'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useAuthStore } from '@assessment/store/useAuthStore'

import DescriptionList from '@shared/components/DescriptionList/DescriptionList.vue'

import { PASSWORD_UPDATE_VIEW } from '@assessment/router/names'

const { t } = useI18n()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

useSEO({ title: `${t('pages.profile.title')} | ${t('app.prefix')}` })

const profileData = computed<DescriptionListItem[]>(() => [
  {
    term: t('pages.profile.name') ?? '',
    type: 'string',
    text: user.value?.name ?? '-'
  },
  {
    term: t('pages.profile.email') ?? '',
    type: 'string',
    text: user.value?.email ?? '-'
  },
  {
    term: t('pages.profile.organisation') ?? '',
    type: 'string',
    text: user.value?.organisation.name ?? '-'
  }
])

const roles = computed<DescriptionListItem[]>(
  () =>
    user.value?.roles.map((role) => ({
      term: role.subsidy?.title ?? 'Rol',
      type: 'string',
      text: t(`pages.profile.roleTypes.${role.name}`)
    })) ?? []
)
</script>

<style lang="scss" scoped>
main section {
  --section-gap: 3rem;
}
main section div {
  --section-content-wrapper-gap: 1rem;
}
</style>
