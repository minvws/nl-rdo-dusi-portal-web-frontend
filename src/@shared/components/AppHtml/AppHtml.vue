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

type Props = {
  as?: string
  html?: string
}

const props = defineProps<Props>()

const router = useRouter()

const tag = computed<string>(() => props.as ?? 'div')

function onClick(event: MouseEvent): void {
  if (!(event.target instanceof HTMLElement)) {
    return
  }

  // open links with router if it is a local link and target !== _blank
  if (event.target.nodeName !== 'A') {
    return
  }

  const href = event.target.getAttribute('href')
  const target = event.target.getAttribute('target')

  if (target !== '_blank' && href?.startsWith('/')) {
    event.preventDefault()
    router.push(href.slice(1))
  }
}
</script>
