<template>
  <div class="error">
    <div class="error-inner">
      <p
        v-for="(error, index) in splitErrors"
        :key="index"
        :id="errorId && errorId[index]"
        v-text="error"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  inputCount?: number
  errors: string
  id?: string
}

const props = defineProps<Props>()

const splitErrors = computed<string[]>(() => props.errors.split('\n'))

const errorId = computed(() => {
  if (!props.id) {
    return undefined
  }

  if (!props.inputCount || props.inputCount === 1) {
    return [`${props.id}`]
  }

  let ids = []

  for (let index = 0; index < props.inputCount; index++) {
    ids.push(`${props.id}-${index}`)
  }

  return ids
})
</script>
