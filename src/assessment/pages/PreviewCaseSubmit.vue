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
          :html="caption"
        />
        <AppTable
          v-bind="{
            columns,
            data,
            itemsPerPage: -1
          }"
        />
      </template>
      <template v-if="html">
        <AppHtml
          as="h5"
          :html="message"
        />
        <div class="letter">
          <AppHtml
            class="html"
            v-bind="{ html }"
          />
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
          :text="translate('pages.preview-case-submit.button.edit')"
          :to="{ name: REVIEW_CASE, replace: true, params: { id } }"
        />
        <AppButton
          @click="onSubmit"
          :class="{ disabled: isSubmitting }"
          >{{ translate('pages.preview-case-submit.button.submit') }}
        </AppButton>
      </div>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { translate } from '@/@shared/i18n'

import { useSEO } from '@shared/composables/useSeo'

import AppHtml from '@/@shared/components/AppHtml/AppHtml.vue'
import AppTable from '@/@shared/components/AppTable/AppTable.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import AppButton from '@/@shared/components/AppButton/AppButton.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

import { useApiCaseTransitionPreview } from '@assessment/composables/useApiCaseTransitionPreview'
import { REVIEW_CASE } from '@assessment/router/names'

type Props = {
  id: string
}

const props = defineProps<Props>()

useSEO({ title: `${translate('pages.preview-case-submit.title')} | ${translate('app.prefix')}` })

const { data, columns, html, error, isFetching, isSubmitting, submitError, onSubmit } =
  useApiCaseTransitionPreview(props.id)

const caption = translate('pages.preview-case-submit.caption')
const message = translate('pages.preview-case-submit.message')
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

  .html {
    padding: 1em;
    :deep(h2) {
      font-size: var(--p-font-size);
    }
  }
}
</style>
