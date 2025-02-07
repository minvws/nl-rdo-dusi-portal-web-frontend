<template>
  <div
    class="app-loader"
    :class="{ 'app-loader--centered': centered }"
  >
    <img
      src="/img/spinner.gif"
      alt=""
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
type Props = {
  centered?: boolean
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.app-loader--centered {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100px;
}
</style>
