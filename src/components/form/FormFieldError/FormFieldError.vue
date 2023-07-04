<template>
  <div class="error">
    <div class="error-inner">
      <p :key="`error-${index}`" v-for="(error, index) in splitErrors" v-text="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  errors: string
}

const props = defineProps<Props>()

const splitErrors = computed(() => props.errors.split('\n'))
</script>
