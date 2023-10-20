<template>
  <component
    :is="tag"
    :class="className ?? 'newLineToBr'"
  >
    <template
      v-for="(line, index) of lines"
      :key="index"
    >
      {{ line }}<br />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  as?: string
  text: string
  className?: string
}

const props = defineProps<Props>()

const tag = computed(() => props.as ?? 'p')
const lines = computed(() => props.text.split('\n'))
</script>
