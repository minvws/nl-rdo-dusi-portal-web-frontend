<template>
  <section>
    <div>
      <p>Dit is een externe pagina en is nog niet ingesteld.</p>
      <pre>{{ $props }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ page: string }>()
</script>
