<template>
  <div
    class="form-notification"
    :class="[{ dismissable: dismissable }, displayAs]"
    :id="htmlId"
  >
    <div>
      <AppHtml
        :as="displayElement"
        :html="html"
        :aria-live="ariaLive"
        :aria-atomic="ariaAtomic"
      />
      <AppButton
        v-if="dismissable && id"
        class="button"
        @click="onDismiss(id)"
      >
        <span class="visually-hidden">{{ t('component.formNotification.close') }}</span>
        <AppIcon name="close" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Notification, NotificationDisplayElementType } from '@shared/types/notification'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

type Props = Notification & {
  displayElement?: NotificationDisplayElementType
  dismissable?: boolean
  id?: string
  announce?: boolean
  htmlId?: string
}

const props = defineProps<Props>()

const { t } = useI18n()
const notificationsStore = useNotificationsStore()

const ariaLive = computed<string | undefined>(() => (props.announce ? 'assertive' : undefined))

const ariaAtomic = computed<string | undefined>(() => (props.announce ? 'true' : undefined))

const translatedType = computed<string | undefined>(() =>
  t(`component.formNotification.${props.displayAs}`)
)

const message = computed<string | undefined>(() =>
  typeof props.message === 'object' ? props.message?.message : props.message
)

const html = computed<string>(
  () => `<span>${props.label ?? translatedType.value}:</span> ${message.value}`
)

const displayElement = computed<string>(() => props.displayElement ?? 'p')

function onDismiss(id: string) {
  notificationsStore.removeById(id)
}
</script>

<style lang="scss" scoped>
.dismissable > div {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--section-content-wrapper-max-width);
  margin: 0 auto;
  padding-right: var(--section-content-wrapper-padding-right);
  padding-left: var(--section-content-wrapper-padding-left);
}

.button {
  --button-base-padding-left: 12px;
  --button-base-padding-right: 12px;
  --button-base-border-color: transparent;
  --button-base-background-color: transparent;
  color: var(--ruby-red-text-color-dark);
}

.error .button {
  --button-base-active-background-color: var(--notification-error-color-intense);
  --button-base-focus-background-color: var(--notification-error-color-intense);
  --button-base-hover-background-color: var(--notification-error-border-color);
  --button-base-active-border-color: var(--notification-error-color-intense);
  --button-base-focus-border-color: var(--notification-error-color-intense);
  --button-base-hover-border-color: var(--notification-error-border-color);
}

.warning .button {
  --button-base-active-background-color: var(--notification-warning-color-intense);
  --button-base-focus-background-color: var(--notification-warning-color-intense);
  --button-base-hover-background-color: var(--notification-warning-border-color);
  --button-base-active-border-color: var(--notification-warning-color-intense);
  --button-base-focus-border-color: var(--notification-warning-color-intense);
  --button-base-hover-border-color: var(--notification-warning-border-color);
}

.explanation .button {
  --button-base-active-background-color: var(--notification-explanation-color-intense);
  --button-base-focus-background-color: var(--notification-explanation-color-intense);
  --button-base-hover-background-color: var(--notification-explanation-border-color);
  --button-base-active-border-color: var(--notification-explanation-color-intense);
  --button-base-focus-border-color: var(--notification-explanation-color-intense);
  --button-base-hover-border-color: var(--notification-explanation-border-color);
}

.confirmation .button {
  --button-base-active-background-color: var(--notification-confirmation-color-intense);
  --button-base-focus-background-color: var(--notification-confirmation-color-intense);
  --button-base-hover-background-color: var(--notification-confirmation-border-color);
  --button-base-active-border-color: var(--notification-confirmation-color-intense);
  --button-base-focus-border-color: var(--notification-confirmation-color-intense);
  --button-base-hover-border-color: var(--notification-confirmation-border-color);
}
</style>
