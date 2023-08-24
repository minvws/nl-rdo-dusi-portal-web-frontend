<template>
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <component
    :is="tag"
    class="html"
    v-html="html"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{ as?: string; html?: string }>()
const tag = computed(() => props.as ?? 'div')

const onClick = (e: Event) => {
  // open links with router if it is a local link and target !== _blank
  const el = e.target as HTMLElement

  if (el.nodeName !== 'A') return

  const href = el.getAttribute('href')
  const target = el.getAttribute('target')

  if (target !== '_blank' && href?.startsWith('/')) {
    e.preventDefault()
    router.push(href.substring(1))
  }
}
</script>
