<template>
  <li>
    <button :id="accordionId" :aria-expanded="ariaExpanded">
      <slot name="title" />
    </button>
    <div :aria-labelledby="accordionId">
      <slot name="content" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  id: string
  isOpen?: boolean
}

const props = defineProps<Props>()

const accordionId = computed(() => `accordion-${props.id}`)
const ariaExpanded = computed(() => (props.isOpen ? 'true' : 'false'))
</script>

<style lang="scss" scoped>
ul.accordion > li > button {
  --accordion-button-background-color: var(--ruby-red-tint-2-background-color);
  --button-base-border-color: var(--ruby-red-tint-2-background-color);
  --button-base-hover-background-color: var(--ruby-red-tint-2-background-color);
  --button-base-focus-border-color: var(--ruby-red-tint-2-background-color);
  --accordion-button-text-color: var(--ruby-red-text-color-dark);
  --accordion-button-icon-after-close-content: '▲';
  --accordion-button-icon-after-open-content: '▼';

  display: flex;
}
ul.accordion > li > div {
  --accordion-content-background-color: #fff;
  --accordion-content-border-color: var(--grey-2);
}
</style>
