<template>
  <div class="data-export">
    <div>
      <h1>{{ translate('component.dataExport.title') }}</h1>
      <p>{{ translate('component.dataExport.intro') }}</p>
    </div>
    <div>
      <form @submit.prevent.stop>
        <fieldset class="group">
          <legend class="group-label">{{ translate('component.dataExport.filter') }}</legend>
          <div class="horizontal-layout">
            <div class="horizontal-layout-item">
              <label for="from">{{ translate('component.dataExport.from') }}</label>
              <!-- The 'pattern' attribute is added because some browsers fallback to type='text'. Otherwise it will just be ignored. -->
              <input
                type="date"
                id="from"
                :min="firstDayOfCurrentYear"
                :max="maxFromDate"
                pattern="\d{4}-\d{2}-\d{2}"
                v-model="chosenFromDate"
              />
            </div>
            <div class="horizontal-layout-item">
              <label for="up-to-and-including">{{ translate('component.dataExport.to') }}</label>
              <!-- The 'pattern' attribute is added because some browsers fallback to type='text'. Otherwise it will just be ignored. -->
              <input
                type="date"
                id="up-to-and-including"
                :min="minUpToDate"
                :max="today"
                pattern="\d{4}-\d{2}-\d{2}"
                v-model="chosenUpToDate"
              />
            </div>
          </div>
        </fieldset>
      </form>
      <AppButton
        type="button"
        class="button"
        @click="onClickDownload"
      >
        {{ translate('component.dataExport.download') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { DateLike } from '@vueuse/core'
import { NotificationType } from '@shared/types/notification'

import { computed, ref } from 'vue'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiDataExportUrl } from '@assessment/composables/useApiUrl'

import AppButton from '@shared/components/AppButton/AppButton.vue'

import { translate } from '@shared/i18n'

const day = 60 * 60 * 24 * 1000
const today = new Date().toISOString().split('T')[0]
const yesterday = new Date(Date.now() - day).toISOString().split('T')[0]
const firstDayOfCurrentYear = new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0]

const notificationsStore = useNotificationsStore()

const chosenFromDate: Ref<DateLike> = ref('')
const chosenUpToDate: Ref<DateLike> = ref('')

const maxFromDate = computed(() => {
  // if chosenUpToDate is set, return that - 1 day
  // else return yesterday
  return chosenUpToDate.value && chosenUpToDate.value < yesterday
    ? new Date(new Date(chosenUpToDate.value).getTime() - day).toISOString().split('T')[0]
    : yesterday
})

const minUpToDate = computed(() => {
  // if chosenFromDate is set, return that + 1 day
  // else return the first day of the current year
  return chosenFromDate.value
    ? new Date(new Date(chosenFromDate.value).getTime() + day).toISOString().split('T')[0]
    : firstDayOfCurrentYear
})

async function onClickDownload() {
  const baseUrl = useApiDataExportUrl()
  const dateFrom = chosenFromDate.value?.toString()
  const dateTo = chosenUpToDate.value?.toString()
  const params = new URLSearchParams({
    ...(dateFrom && { date_from: dateFrom }),
    ...(dateTo && { date_to: dateTo })
  })
  const url = `${baseUrl}${params.size ? `?${params}` : ''}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv;charset=utf-8;'
    }
  }

  try {
    const { data, isFetching } = await useFetchWithCredentials(url, options)

    if (!data.value) {
      notificationsStore.add({
        id: 'data-export-empty',
        displayAs: NotificationType.ERROR,
        label: translate('notification.data-export-empty.label') ?? '',
        message: translate('notification.data-export-empty.message') ?? '',
        pageChangeCount: 1
      })
    }

    if (!isFetching.value && data.value) {
      notificationsStore.add({
        id: 'data-export-success',
        displayAs: NotificationType.CONFIRMATION,
        label: translate('notification.data-export-success.label') ?? '',
        message: translate('notification.data-export-success.message') ?? '',
        pageChangeCount: 1
      })

      const file = new Blob([data.value as BlobPart], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.hidden = true
      link.href = URL.createObjectURL(file)
      link.download = `${dateFrom ? `${dateFrom}_` : ''}${dateTo ? `${dateTo}-` : ''}FDC-export.csv`
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    notificationsStore.add({
      id: 'data-export-error',
      displayAs: NotificationType.ERROR,
      label: translate('notification.data-export-error.label') ?? '',
      message: translate('notification.data-export-error.message') ?? '',
      pageChangeCount: 1
    })
  }
}
</script>

<style lang="scss" scoped>
.data-export {
  --form-base-padding-bottom: 2rem;
}
</style>
