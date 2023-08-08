<template>
  <div class="request-reviewers">
    <p>
      {{ t('component.requestReviers.intro') }}
    </p>
    <p>
      {{ t('component.requestReviers.handledBy') }}
    </p>
    <p>
      <strong>{{ reviewer }}</strong>
    </p>

    <AppButton class="ghost">
      {{ t('component.requestReviers.removeReviewer') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/shared/components/AppButton/AppButton.vue'

const { t } = useI18n()

type Props = {
  reviewer: string
}

defineProps<Props>()
</script>
