<template>
  <div class="notification-counter">
    <span class="message-counter">
      {{ formattedValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  value: number
}

const props = defineProps<Props>()

const formattedValue = computed(() => (props.value > 99 ? '99+' : props.value))
</script>

<style lang="scss" scoped>
.notification-counter {
  margin-left: 0.5em;
}

.message-counter {
  aspect-ratio: 1;
  --message-counter-base-border-radius: 50%;
  --message-counter-base-padding: 2px;
}
</style>
