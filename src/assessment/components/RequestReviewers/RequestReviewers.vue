<template>
  <div class="request-reviewers">
    <p>
      {{ translate('component.requestReviers.intro') }}
    </p>
    <p>
      {{ translate('component.requestReviers.handledBy') }}
    </p>
    <p>
      <strong>{{ reviewer }}</strong>
    </p>

    <AppButton class="ghost">
      {{ translate('component.requestReviers.removeReviewer') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

type Props = {
  reviewer: string
}

defineProps<Props>()
</script>
