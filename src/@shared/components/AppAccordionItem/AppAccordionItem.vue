<template>
  <li>
    <button
      :id="accordionId"
      :aria-expanded="ariaExpanded"
      :class="{ highlighted: isHighlighted }"
    >
      <slot name="title" />
    </button>
    <div :aria-labelledby="accordionId">
      <slot name="content" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'

type Props = {
  id: string
  initiallyOpen?: boolean
  isHighlighted?: boolean
}

const props = defineProps<Props>()

onBeforeMount(() => (ariaExpanded.value = props.initiallyOpen ?? false))

const ariaExpanded = ref<boolean>(false)

const accordionId = computed<string>(() => `accordion-${props.id}`)
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

  &.highlighted {
    --accordion-button-background-color: var(--ruby-red-background-color);
    --button-base-border-color: var(--ruby-red-background-color);
    --button-base-hover-background-color: var(--ruby-red-background-color);
    --button-base-focus-border-color: var(--ruby-red-background-color);
    --accordion-button-text-color: var(--ruby-red-text-color-light);
  }
}
ul.accordion > li > div {
  --accordion-content-background-color: #fff;
  --accordion-content-border-color: var(--grey-2);
}
</style>
