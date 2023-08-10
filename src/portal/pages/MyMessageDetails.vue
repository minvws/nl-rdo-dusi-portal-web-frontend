<template>
  <section>
    <div>
      <h1>Bericht details</h1>
      <p>Details for {{ route.params.id }}</p>
      <p>@TODO: implement design</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
