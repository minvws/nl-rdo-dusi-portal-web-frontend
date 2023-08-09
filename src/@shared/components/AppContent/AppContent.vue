<template>
  <main
    id="main-content"
    tabindex="-1"
  >
    <slot />
  </main>
</template>

<style lang="scss" scoped>
#main-content {
  // @TODO: give the main content some minimal-height
  min-height: 70vh;
}
</style>
