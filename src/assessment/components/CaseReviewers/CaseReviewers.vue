<template>
  <div class="case-reviewers">
    <p>
      {{ translate('component.caseReviewers.intro') }}
    </p>
    <p>
      {{ translate('component.caseReviewers.handledBy') }}
    </p>
    <p>
      <strong>{{ name }}</strong>
    </p>

    <AppButton
      class="ghost"
      @click="onRemove"
    >
      {{ translate('component.caseReviewers.removeReviewer') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { translate } from '@shared/i18n'

import AppButton from '@shared/components/AppButton/AppButton.vue'

type Props = {
  name: string
}

defineProps<Props>()

function onRemove() {
  console.log('@TODO: remove reviewer from case')
}
</script>
