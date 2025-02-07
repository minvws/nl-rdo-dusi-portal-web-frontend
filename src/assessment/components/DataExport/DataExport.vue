<template>
  <div class="data-export">
    <div>
      <h1>{{ title }}</h1>
      <p>{{ intro }}</p>
    </div>
    <div class="data-export__form" v-if="hasDateFilters">
      <form @submit.prevent.stop>
        <FormNotification
          v-if="showNotification"
          display-as="warning"
          :message="notificationMessage"
        />
        <fieldset class="group">
          <legend class="group-label">{{ t('component.dataExport.filter') }}</legend>
          <div class="horizontal-layout">
            <div class="horizontal-layout-item">
              <label for="from">{{ t('component.dataExport.from') }}</label>
              <!-- The 'pattern' attribute is added because some browsers fallback to type='text'. Otherwise it will just be ignored. -->
              <input
                type="date"
                id="from"
                :min="MIN_START_DATE"
                :max="maxFromDate"
                pattern="\d{4}-\d{2}-\d{2}"
                v-model="valueFromDate"
                @focus="onFocus"
                @blur="onBlur"
              />
            </div>
            <div class="horizontal-layout-item">
              <label for="up-to-and-including">{{ t('component.dataExport.to') }}</label>
              <!-- The 'pattern' attribute is added because some browsers fallback to type='text'. Otherwise it will just be ignored. -->
              <input
                type="date"
                id="up-to-and-including"
                :min="minUpToDate"
                :max="TODAY"
                pattern="\d{4}-\d{2}-\d{2}"
                v-model="valueUpToDate"
                @focus="onFocus"
                @blur="onBlur"
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    <AppButton
      type="button"
      class="button"
      :disabled="hasInvalidDates"
      @click="onClickDownload"
    >
      {{ t('component.dataExport.download') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { DateLike } from '@vueuse/core'
import { NotificationType } from '@shared/types/notification'

import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import AppButton from '@shared/components/AppButton/AppButton.vue'
import FormNotification from '@shared/components/FormNotification/FormNotification.vue'

type Props = {
  title: string
  intro: string
  hasDateFilters: boolean
  endpointUrl: string
}

const props = defineProps<Props>()

// Fixed timestamp values
const DAY = 60 * 60 * 24 * 1000
const TODAY = new Date().toISOString().split('T')[0]
const YESTERDAY = new Date(Date.now() - DAY)
const MIN_START_DATE = new Date('2023-01-01').toISOString().split('T')[0]

const { t } = useI18n()
const notificationsStore = useNotificationsStore()

const isFocussed = ref<boolean>(false)
const valueFromDate = ref<DateLike>('')
const valueUpToDate = ref<DateLike>('')

// returns timestamp of chosen 'from' value
const chosenFromDayTime = computed<number>(() => new Date(valueFromDate.value as string).getTime())

// returns timestamp of chosen 'up to' value
const chosenUpToDayTime = computed<number>(() => new Date(valueUpToDate.value as string).getTime())

// returns timestamp of first day of current year
const minFromDayTime = computed<number>(() => new Date(MIN_START_DATE).getTime())

// returns timestamp of yesterday
const yesterdayTime = computed<number>(() => new Date(YESTERDAY).getTime())

// returns the max date that can be chosen in the 'from' field
// if chosenUpToDayTime is set and is smaller than yesterdayTime, return chosenUpToDayDate
// else return yesterdayDate
const maxFromTime = computed<number>(() => {
  return chosenUpToDayTime.value && chosenUpToDayTime.value < yesterdayTime.value
    ? chosenUpToDayTime.value - DAY
    : yesterdayTime.value
})

// returns the min date that can be chosen in the 'up to' field
// if chosenFromDayTime is set, use that, else use minFromDayDate
const minUpToTime = computed<number>(() => {
  return chosenFromDayTime.value ? chosenFromDayTime.value + DAY : minFromDayTime.value
})

// returns the max date that can be chosen in the 'from' field
const maxFromDate = computed<string>(() => new Date(maxFromTime.value).toISOString().split('T')[0])

// returns the min date that can be chosen in the 'up to' field
const minUpToDate = computed<string>(() => new Date(minUpToTime.value).toISOString().split('T')[0])

const startDateToEarly = computed<boolean>(() => chosenFromDayTime.value <= minFromDayTime.value)

const startDateAfterEndDate = computed<boolean>(
  () => chosenFromDayTime.value >= chosenUpToDayTime.value
)

const endDateInFuture = computed<boolean>(
  () => chosenUpToDayTime.value >= new Date(Date.now()).getTime()
)

const hasInvalidDates = computed<boolean>(
  () => startDateToEarly.value || startDateAfterEndDate.value || endDateInFuture.value
)

const showNotification = computed<boolean>(() =>
  Boolean(!isFocussed.value && hasInvalidDates.value && valueFromDate.value && valueUpToDate.value)
)

const notificationMessage = computed<string>(() => {
  if (startDateToEarly.value) {
    return t('component.dataExport.startDateToEarly')
  }

  if (startDateAfterEndDate.value) {
    return t('component.dataExport.startDateAfterEndDate')
  }

  if (endDateInFuture.value) {
    return t('component.dataExport.endDateInFuture')
  }

  return ''
})

function onBlur() {
  isFocussed.value = false
}

function onFocus() {
  isFocussed.value = true
}

async function onClickDownload() {
  const baseUrl = props.endpointUrl

  let dateFrom = undefined
  let dateTo = undefined
  if (props.hasDateFilters) {
    dateFrom = valueFromDate.value?.toString()
    dateTo = valueUpToDate.value?.toString()
  }
  const params = new URLSearchParams({
    ...(dateFrom && { date_from: dateFrom }),
    ...(dateTo && { date_to: dateTo })
  })
  const url = `${baseUrl}${params.size > 0 ? `?${params}` : ''}`
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'text/csv;charset=utf-8;'
    }
  }

  try {
    const { data, response, isFetching } = await useFetchWithCredentials(url, options)
    const statusIsOk = response.value?.status === 200 && response.value?.headers.get('content-type') === 'text/csv; charset=UTF-8'

    if (!statusIsOk) {
      notificationsStore.add({
        id: 'data-export-error',
        displayAs: NotificationType.ERROR,
        label: t('notification.data-export-error.label'),
        message: t('notification.data-export-error.message'),
        pageChangeCount: 1
      })
    }

    if (!isFetching.value && statusIsOk) {
      notificationsStore.add({
        id: 'data-export-success',
        displayAs: NotificationType.CONFIRMATION,
        label: t('notification.data-export-success.label'),
        message: t('notification.data-export-success.message'),
        pageChangeCount: 1
      })

      const file = new Blob([data.value as BlobPart], { type: 'text/csv;charset=utf-8;' })
      const link: HTMLAnchorElement = document.createElement('a')
      link.hidden = true
      link.href = URL.createObjectURL(file)
      link.download = `${dateFrom ? `${dateFrom}_` : ''}${dateTo ? `${dateTo}-` : ''}${props.title}.csv`
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.append(link)
      link.click()
      link.remove()
    }
  } catch {
    notificationsStore.add({
      id: 'data-export-error',
      displayAs: NotificationType.ERROR,
      label: t('notification.data-export-error.label'),
      message: t('notification.data-export-error.message'),
      pageChangeCount: 1
    })
  }
}
</script>

<style lang="scss" scoped>
.data-export {
  --form-base-padding-bottom: 2rem;
}

.data-export__form {
  width: 100%;
}
</style>
