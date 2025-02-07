<template>
  <section>
    <AppSuspense
      v-bind="{
        data,
        error,
        isFetching
      }"
    >
      <template v-if="columns">
        <AppHtml
          as="h5"
          :html="t('pages.preview-case-submit.caption')"
        />
        <AppTable
          :columns="columns"
          :data="data"
        />
      </template>
      <template v-if="html">
        <AppHtml
          as="h5"
          :html="t('pages.preview-case-submit.message')"
        />
        <div class="letter">
          <MessageContent :html="html" />
        </div>
      </template>
      <FormNotification
        v-if="submitError"
        display-as="error"
        :message="submitError"
      />
      <div class="buttons">
        <RouterLink
          class="ghost button"
          :class="{ disabled: isSubmitting }"
          :text="t('pages.preview-case-submit.button.edit')"
          :to="{ name: REVIEW_CASE, replace: true, params: { id } }"
        />
        <AppButton
          :class="{ disabled: isSubmitting }"
          @click="onSubmit"
        >
          {{ t('pages.preview-case-submit.button.submit') }}
        </AppButton>
      </div>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppTable from '@shared/components/AppTable/AppTable.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppButton from '@shared/components/AppButton/AppButton.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'
import MessageContent from '@shared/components/MessageContent/MessageContent.vue'

import { useApiCaseTransitionPreview } from '@assessment/composables/useApiCaseTransitionPreview'
import { REVIEW_CASE } from '@assessment/router/names'

type Props = {
  id: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const { data, columns, html, error, isFetching, isSubmitting, submitError, onSubmit } =
  useApiCaseTransitionPreview(props.id)

useSEO({ title: `${t('pages.preview-case-submit.title')} | ${t('app.prefix')}` })
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;

  @include mobile {
    flex-direction: column;
    > * {
      width: 100%;
    }
  }
}

.letter {
  box-shadow: 6px 12px 41px rgba(0, 0, 0, 0.3);
  padding: 1em;
}
</style>
