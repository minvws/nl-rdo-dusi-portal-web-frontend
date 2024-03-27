<template>
  <section>
    <AppIntro
      v-if="subsidy"
      :title="subsidy.code"
      :intro="subsidy.description"
      :body="introBody"
    />
    <div v-if="canCreateNewApplication">
      <AppButton
        type="button"
        class="button"
        @click="onClick"
        :disabled="isCreatingNewApplication"
      >
        {{ t('pages.arrangement-overview.newRequest') }}
        <AppLoader
          class="loader"
          v-if="isCreatingNewApplication"
        />
      </AppButton>
    </div>
    <AppSuspense v-bind="{ data: concepts, error, isFetching }">
      <div class="arrangement-overview">
        <h3>{{ t('pages.arrangement-overview.yourArrangements') }}</h3>
        <p>
          {{ t('pages.arrangement-overview.description') }}
          <RouterLink :to="{ name: MY_REQUESTS_OVERVIEW }">{{
            t('pages.my-requests-overview.title')
          }}</RouterLink
          >.
        </p>
        <RequestCards
          v-if="concepts.length > 0"
          :headings="headings"
          :data="concepts"
        />
      </div>
      <template #fallback>
        <h3>{{ t('pages.arrangement-overview.title') }}</h3>
        <p>{{ t('pages.arrangement-overview.noRequests') }}</p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Column } from '@shared/types/table'

import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSEO } from '@shared/composables/useSeo'
import { useFetchArrangement } from '@portal/composables/useFetchArrangement'
import { useFormDraft } from '@shared/composables/form/useFormDraft'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppLoader from '@shared/components/AppLoader/AppLoader.vue'
import AppIntro from '@shared/components/AppIntro/AppIntro.vue'
import AppSuspense from '@shared/components/AppSuspense/AppSuspense.vue'
import RequestCards from '@portal/components/RequestCards/RequestCards.vue'

import { MY_REQUESTS_OVERVIEW, MY_REQUEST_EDIT } from '@portal/router/names'
import { log } from '@shared/utils/logger'

type Props = {
  id: string
}

const props = defineProps<Props>()

const columns = [
  { id: 'subsidy', sortable: false },
  { id: 'file', sortable: false },
  { id: 'created', sortable: false },
  { id: 'final_review_deadline', sortable: false },
  { id: 'status', sortable: false },
  { id: 'updated_at', sortable: false },
  { id: 'actionRequired', sortable: false },
  { id: 'action', sortable: false }
]

const { t } = useI18n()
const router = useRouter()
const { data, error, isFetching } = useFetchArrangement(props.id)
const { createDraft } = useFormDraft()

useSEO({ title: `${t('pages.arrangement-overview.title')} | ${t('app.prefix')}` })

const isCreatingNewApplication = ref<boolean>(false)

const headings = computed<Column[]>(() =>
  columns.map((item) => ({
    ...item,
    text: t(`pages.arrangement-overview.table.${item.id}`)
  }))
)

const concepts = computed<Record<string, any>[]>(() => data.value?.concepts || [])

const introBody = computed<string>(() =>
  multipleApplications.value ? t('pages.arrangement-overview.introBody') : ''
)

const multipleApplications = computed<boolean>(() =>
  Boolean(subsidy.value?.allowMultipleApplications)
)

const newApplications = computed<boolean>(() => Boolean(subsidy.value?.isOpenForNewApplications))

const canCreateNewApplication = computed<boolean>(() => {
  if (newApplications.value === false) {
    return false
  }

  if (
    newApplications.value === true &&
    multipleApplications.value === false &&
    concepts.value.length > 0
  ) {
    return false
  }

  return true
})

const subsidy = computed<Record<string, any> | undefined>(() => data.value?.subsidy)

function onClick(): void {
  if (subsidy.value === undefined) {
    log('cannot create new application, subsidy is undefined')
    return
  }

  isCreatingNewApplication.value = true

  createDraft(subsidy.value.code)
    .then((draft) => {
      isCreatingNewApplication.value = false
      router.push({ name: MY_REQUEST_EDIT, params: { reference: draft.reference } })
    })
    .catch(() => (isCreatingNewApplication.value = false))
}

watch(
  subsidy,
  (subsidy) => {
    if (subsidy) {
      const title = `${subsidy.code} ${t('pages.arrangement-overview.arrangements')} | ${t('app.prefix')}`
      window.document.title = title
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
#main-content section {
  --section-gap: 4rem;
}
</style>
