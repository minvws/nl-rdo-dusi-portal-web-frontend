<template>
  <section>
    <AppIntro
      v-if="subsidy"
      :title="subsidyTitle"
      :intro="intro"
    />
    <div v-if="subsidy && canCreateNewApplication">
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
    <div v-if="subsidy && !canCreateNewApplication">
      <AppButton
        type="button"
        class="button"
        :class="{ 'ghost': subsidyIsOpenForApplications }"
        @click="goBackToDusi"
      >
        {{ t('pages.arrangement-overview.backToDusi') }}
      </AppButton>
    </div>
    <AppSuspense v-bind="{ data: requests, error, isFetching }">
      <div>
        <h3>{{ t('pages.arrangement-overview.yourArrangements') }}</h3>
        <p>
          {{ t('pages.arrangement-overview.description', { subsidyCode }) }}
          <RouterLink :to="{ name: MY_REQUESTS_OVERVIEW }">{{
            t('pages.my-requests-overview.title')
          }}</RouterLink
          >.
        </p>
        <RequestCards
          v-if="requests.length > 0"
          :headings="headings"
          :data="requests"
        />
      </div>
      <template #fallback>
        <h3>{{ t('pages.arrangement-overview.yourArrangements') }}</h3>
        <p>
          {{ t('pages.arrangement-overview.noRequests', { subsidyCode }) }}
          <RouterLink :to="{ name: MY_REQUESTS_OVERVIEW }">{{
              t('pages.my-requests-overview.title')
            }}</RouterLink>.
        </p>
      </template>
    </AppSuspense>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Column } from '@shared/types/table'

import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'
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
const notificationsStore = useNotificationsStore()
const { data, error, isFetching, onFetchError } = useFetchArrangement(props.id)
const { createDraft } = useFormDraft()

useSEO({ title: `${t('pages.arrangement-overview.title')} | ${t('app.prefix')}` })

onFetchError(() => {
  notificationsStore.add({
    label: t(`component.formNotification.error`),
    message: t(`form.message.subsidy_not_found`),
    displayAs: 'error',
    id: 'arrangement-overview-error',
    pageChangeCount: 2,
    dismissable: true
  })

  router.push({ name: MY_REQUESTS_OVERVIEW })
})

const isCreatingNewApplication = ref<boolean>(false)

const headings = computed<Column[]>(() =>
  columns.map((item) => ({
    ...item,
    text: t(`pages.arrangement-overview.table.${item.id}`)
  }))
)

const requests = computed(() => data.value?.applications || [])

const subsidyAllowsMultipleApplications = computed<boolean>(() =>
  Boolean(subsidy.value?.allowMultipleApplications)
)

const subsidyIsOpenForApplications = computed<boolean>(() => Boolean(subsidy.value?.isOpenForNewApplications))
const canCreateNewApplication = computed<boolean>(() => Boolean(data.value?.newConceptAllowed))
const hasApprovedApplication = computed<boolean>(() => Boolean(data.value?.hasApprovedApplication))
const hasRejectedApplication = computed<boolean>(() => Boolean(data.value?.hasRejectedApplication))

const subsidy = computed<Record<string, any> | undefined>(() => data.value?.subsidy)

const subsidyCode = computed<string>(() => {
  return subsidy.value?.code
})

const intro = computed<string>(() => {
  if (!subsidyIsOpenForApplications.value) {
    // Subsidy is closed
    return t('pages.arrangement-overview.arrangementClosed.description')
  }

  if (subsidyAllowsMultipleApplications.value) {
    // Subsidy is open for applications and multiple applications are allowed
    return t('pages.arrangement-overview.arrangementsAllowed.multiple.descriptionMultipleOpenArrangement')
  }

  if (hasApprovedApplication.value) {
    // Subsidy is open for applications but user has an approved application
    return t('pages.arrangement-overview.arrangementsAllowed.single.approvedArrangement')
  }

  if (!canCreateNewApplication.value) {
    // Subsidy is open for applications but user has an open application
    return t('pages.arrangement-overview.arrangementsAllowed.single.openArrangement')
  }

  if (hasRejectedApplication.value) {
    // Subsidy is open for applications but user has a rejected application
    return t('pages.arrangement-overview.arrangementsAllowed.single.rejectedArrangement')
  }

  // New application allowed
  return subsidy.value?.description
})

const subsidyTitle = computed<string>(() => {
  if (!subsidyIsOpenForApplications.value) {
    // Subsidy is closed
    return t('pages.arrangement-overview.arrangementClosed.title')
  }

  // New application allowed
  return subsidy.value?.title
})

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

function goBackToDusi(): void {
  if (subsidy.value === undefined) {
    log('cannot go back to dusi, subsidy is undefined')
    return
  }

  if (!subsidy.value.pageUrl) {
    log('cannot go back to dusi, pageUrl is undefined')
    return
  }

  window.location.href = subsidy.value.pageUrl;
}

watch(
  subsidy,
  (subsidy) => {
    if (subsidy) {
      const title = `${t('pages.arrangement-overview.title')} ${subsidy.code} | ${t('app.prefix')}`
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
