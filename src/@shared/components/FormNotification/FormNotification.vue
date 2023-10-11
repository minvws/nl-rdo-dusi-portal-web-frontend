<template>
  <div
    class="form-notification"
    :class="[{ dismissable: dismissable }, displayAs]"
  >
    <AppHtml
      as="p"
      :html="html"
      :aria-live="props.announce ? 'assertive' : undefined"
      :aria-atomic="props.announce ? 'true' : undefined"
    />
    <AppButton
      v-if="dismissable && id"
      class="button"
      @click="onDismiss(id)"
    >
      <span class="visually-hidden">Sluiten</span>
      <AppIcon name="close" />
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { Notification } from '@shared/types/notification'

import { computed } from 'vue'

import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import { translate } from '@shared/i18n'

import AppHtml from '@shared/components/AppHtml/AppHtml.vue'
import AppButton from '@shared/components/AppButton/AppButton.vue'
import AppIcon from '@shared/components/AppIcon/AppIcon.vue'

type Props = Notification & {
  dismissable?: boolean
  id?: string
  announce?: boolean
}

const props = defineProps<Props>()

const notifications = useNotificationsStore()

const translatedType = computed(() => translate(`component.formNotification.${props.displayAs}`))

const message = computed(() =>
  typeof props.message === 'object' ? props.message?.message : props.message
)

const html = computed(() => `<span>${props.label ?? translatedType.value}:</span> ${message.value}`)

function onDismiss(id: string) {
  notifications.removeById(id)
}
</script>

<style lang="scss" scoped>
.dismissable {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.button {
  color: var(--ruby-red-text-color-dark);
  --button-base-padding-left: 12px;
  --button-base-padding-right: 12px;
  --button-base-border-color: transparent;
  --button-base-background-color: transparent;
}

.error .button {
  --button-base-hover-border-color: var(--notification-error-border-color);
  --button-base-hover-background-color: var(--notification-error-border-color);
}

.warning .button {
  --button-base-hover-border-color: var(--notification-warning-border-color);
  --button-base-hover-background-color: var(--notification-warning-border-color);
}

.explanation .button {
  --button-base-hover-border-color: var(--notification-explanation-border-color);
  --button-base-hover-background-color: var(--notification-explanation-border-color);
}

.confirmation .button {
  --button-base-hover-border-color: var(--notification-confirmation-border-color);
  --button-base-hover-background-color: var(--notification-confirmation-border-color);
}
</style>
